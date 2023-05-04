import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';
import { prompt } from 'enquirer';
import { EntityMeta, EntityType } from '@mollify/types';
import { ENTITY_FILE, INDEX_FILE } from '../constants';
import { slugger } from '../utilities';
import cliProgress from 'cli-progress';
import { table, log, error } from 'console';

async function getUserInput(
  existingFrontmatter: Partial<EntityMeta>,
  filePath: string,
): Promise<Partial<EntityMeta>> {
  const parsedPath = path.parse(filePath);
  const isIndexFile = parsedPath.base === INDEX_FILE;

  const initialSlug = isIndexFile
    ? slugger(parsedPath.dir.split(path.sep).pop() || '')
    : slugger(existingFrontmatter.slug || existingFrontmatter.title || '');

  table(existingFrontmatter);

  return await prompt<EntityMeta>([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title:',
      initial: existingFrontmatter.title || '',
      validate(input) {
        return input.length > 0;
      },
    },
    {
      type: 'input',
      name: 'slug',
      message: 'Enter the slug:',
      initial: initialSlug,
      skip: () => isIndexFile,
      result: (slug) => slugger(slug),
      validate(input) {
        return input.length > 0;
      },
    },
    {
      type: 'select',
      name: 'type',
      message: 'Select the entity type:',
      choices: Object.values(EntityType).map((type) => ({
        value: type,
        name: type,
      })),
      initial: Object.values(EntityType).indexOf(
        existingFrontmatter.type || EntityType.Lesson,
      ),
      result: (selectedType) => selectedType,
    },
  ]);
}

export async function migrateEntity(file: string) {
  try {
    const fileContent = await fs.readFile(file, 'utf8');
    const { data: existingFrontmatter, content } = matter(fileContent);
    const existingSlug = slugger(path.parse(file).name);

    const userInput = await getUserInput(
      {
        ...existingFrontmatter,
        slug: existingSlug,
      },
      file,
    );

    const frontmatter = { ...existingFrontmatter, ...userInput };
    const newFileContent = matter.stringify(content, frontmatter);

    const newDir = path.join(
      path.dirname(file),
      userInput.slug || slugger(userInput.title || ''),
    );
    const newFilePath = path.join(newDir, ENTITY_FILE);

    if (!(await fs.pathExists(newFilePath))) {
      await fs.ensureDir(newDir);
      await fs.writeFile(newFilePath, newFileContent);
      await fs.unlink(file);
    } else {
      log(
        `Skipped ${file} as there's already a ${ENTITY_FILE} file in the folder.`,
      );
    }
  } catch (err) {
    error(`Error migrating ${file}: ${err}`);
  }
}

export async function migrateEntities(basePath: string) {
  const pattern = path.join(basePath, '**/!(*+page).md');
  const ignorePattern = path.join('src', 'templates', '**/*'); // Ignore pattern for src/templates
  const files = glob.sync(pattern, { ignore: ignorePattern });

  const progressBar = new cliProgress.SingleBar(
    {
      format: `Migrating ${files.length} files | {bar} | {percentage}% | {value}/{total} Files`,
    },
    cliProgress.Presets.shades_classic,
  );

  log('------------------------------------');

  progressBar.start(files.length, 0);

  for await (const [index, file] of files.entries()) {
    progressBar.stop();

    await migrateEntity(file);

    progressBar.start(files.length, index);
    progressBar.increment(); // Increment the progress bar
  }

  progressBar.stop(); // Stop the progress bar

  log('Migration completed');
}

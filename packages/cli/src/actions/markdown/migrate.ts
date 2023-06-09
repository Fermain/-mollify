import fs from 'fs-extra';
import path from 'path';
import * as glob from 'glob';
import matter from 'gray-matter';
import { prompt } from 'enquirer';
import { EntityBase, EntityMeta, EntityType } from '@mollify/types';
import { ENTITY_FILE } from '../../constants';
import cliProgress from 'cli-progress';
import { table, log, error } from 'console';
import entity from '../entity';

let cancelMigration = false; // create a flag

process.on('SIGINT', function () {
  cancelMigration = true;
  console.log('Migration aborted');
});

async function getUserInput(
  existingFrontmatter: Partial<EntityMeta>,
): Promise<Partial<EntityMeta>> {
  table(existingFrontmatter);

  return await prompt<EntityBase>([
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
    {
      type: 'list',
      name: 'tags',
      message: 'Enter tags for the entity:',
      initial: existingFrontmatter.tags || [],
    },
  ]);
}

export async function migrateMarkdownFile(file: string) {
  try {
    const fileContent = await fs.readFile(file, 'utf8');
    const { data: existingFrontmatter, content } = matter(fileContent);
    let slug = entity.slug.create(path.parse(file).name);
    slug = slug === 'index' ? '' : slug;

    const userInput = await getUserInput(existingFrontmatter);

    const frontmatter = { ...existingFrontmatter, ...userInput };
    const newFileContent = matter.stringify(content, frontmatter);

    const newDir = path.join(path.dirname(file), slug);
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

export async function migrateMarkdownFiles(basePath: string) {
  const pattern = path.join(basePath, '**/!(*+page).md');
  const ignorePattern = [
    path.join('src', 'templates', '**/*'), // Ignore pattern for src/templates
    path.join('node_modules', '**/*'), // Ignore pattern for node_modules
  ];
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
    if (cancelMigration) {
      break; // Check the flag before every migration and break if it's true
    }

    progressBar.stop();

    await migrateMarkdownFile(file);

    progressBar.start(files.length, index);
    progressBar.increment(); // Increment the progress bar
  }

  progressBar.stop();

  if (cancelMigration) {
    log('Migration cancelled after processing', files.length, 'files');
  } else {
    log('Migration completed');
  }
}

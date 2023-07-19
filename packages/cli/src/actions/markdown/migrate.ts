import fs from 'fs-extra';
import path from 'path';
import * as glob from 'glob';
import matter from 'gray-matter';
import { prompt } from 'enquirer';
import { EntityBase, EntityMeta, EntityType } from '@mollify/types';
import { ENTITY_FILE } from '../../constants';
import cliProgress from 'cli-progress';
import { table, log, error } from 'console';
import images from './images';

let cancelMigration = false; // create a flag

process.on('SIGINT', function () {
  cancelMigration = true;
  console.log('Migration aborted');
});

export function migratePath(originalPath: string): string {
  const dirname = path.dirname(originalPath);
  const basename = path.basename(originalPath, '.md');
  const parentDirname = path.basename(dirname);

  if (basename === 'index' || basename === parentDirname) {
    return path.join(dirname, '+page.md');
  } else {
    return path.join(dirname, basename, '+page.md');
  }
}

async function getUserInput(
  existingFrontmatter: Partial<EntityMeta>,
  file: string
): Promise<Partial<EntityMeta>> {
  log(file);
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

async function generateNewFileContent(file: string) {
  const fileContent = await fs.readFile(file, 'utf8');
  const { data: existingFrontmatter, content } = matter(fileContent);
  const userInput = await getUserInput(existingFrontmatter, file);
  const frontmatter = { ...existingFrontmatter, ...userInput };
  return matter.stringify(content, frontmatter);
}

async function writeNewFile(file: string, newFilePath: string, newFileContent: string) {
  if (!(await fs.pathExists(newFilePath))) {
    await fs.ensureFile(newFilePath);
    await fs.writeFile(newFilePath, newFileContent);
    await fs.unlink(file);
  } else {
    log(`Skipped ${file} as there's already a ${ENTITY_FILE} file in the folder.`);
  }
}

export async function migrateMarkdownFile(file: string) {
  try {
    const newFileContent = await generateNewFileContent(file);
    const newFilePath = migratePath(file);
    await writeNewFile(file, newFilePath, newFileContent);
  } catch (err) {
    error(`Error migrating ${file}: ${err}`);
  }
}

export async function migrateMarkdownFiles(basePath: string) {
  const pattern = path.join(basePath, '**/!(*+page).md');
  const ignorePattern = [
    path.join('src', 'templates', '**/*'), // Ignore pattern for src/templates
    path.join('node_modules', '**/*'), // Ignore pattern for node_modules
    '**/[Rr][Ee][Aa][Dd][Mm][Ee].md', // Ignore pattern for README.md
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

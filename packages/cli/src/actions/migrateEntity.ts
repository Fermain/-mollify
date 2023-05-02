import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';
import { prompt } from 'enquirer';
import { Entity, EntityType } from '../types';
import { ENTITY_FILE, INDEX_FILE } from '../constants';
import { slugger } from '../utilities';

async function getUserInput(
  existingFrontmatter: Partial<Entity>,
  filePath: string,
): Promise<Partial<Entity>> {
  const parsedPath = path.parse(filePath);
  const isIndexFile = parsedPath.base === INDEX_FILE;

  const initialSlug = isIndexFile
    ? slugger(parsedPath.dir.split(path.sep).pop() || '')
    : slugger(existingFrontmatter.slug || existingFrontmatter.title || '');

  console.log(`Migrating ${filePath}...`);
  console.log(`Migrating to ${initialSlug}...`);

  return await prompt<Entity>([
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
      console.log(`Migrated ${file} -> ${newFilePath}`);
    } else {
      console.log(
        `Skipped ${file} as there's already a ${ENTITY_FILE} file in the folder.`,
      );
    }
  } catch (error) {
    console.error(`Error migrating ${file}: ${error}`);
  }
}

export async function migrateEntities(basePath: string) {
  const pattern = path.join(basePath, '**/!(*+page).md');
  const ignorePattern = path.join('src', 'templates', '**/*'); // Ignore pattern for src/templates
  const files = glob.sync(pattern, { ignore: ignorePattern });

  console.log('Total files to migrate:', files.length);

  let index = 0;
  for await (const file of files) {
    console.log(`Migrating file ${index + 1} of ${files.length}: ${file}`);
    await migrateEntity(file);
    index++;
  }

  console.log('Migration completed');
}

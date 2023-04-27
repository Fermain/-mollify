import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import matter from 'gray-matter';
import { prompt } from 'enquirer';
import { Entity, EntityType } from '../types';
import { ENTITY_FILE } from '../constants';
import { slugger } from '../utilities';

async function getUserInput(
  existingFrontmatter: Partial<Entity>,
): Promise<Partial<Entity>> {
  const { title, slug, type } = await prompt<Entity>([
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
      initial: slugger(
        existingFrontmatter.slug || existingFrontmatter.title || '',
      ),
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

  return { title, slug, type };
}

export async function migrateEntity(file: string) {
  const fileContent = await fs.readFile(file, 'utf8');
  const { data: existingFrontmatter, content } = matter(fileContent);
  const existingSlug = path.parse(file).name;

  const userInput = await getUserInput({
    ...existingFrontmatter,
    slug: existingSlug,
  });

  const frontmatter = { ...existingFrontmatter, ...userInput };
  const newFileContent = matter.stringify(content, frontmatter);

  const newDir = path.join(
    path.dirname(file),
    userInput.slug || slugger(userInput.title || ''),
  );
  const newFilePath = path.join(newDir, ENTITY_FILE);

  if (!fs.existsSync(newFilePath)) {
    await fs.ensureDir(newDir);
    await fs.writeFile(newFilePath, newFileContent);
    await fs.unlink(file);
    console.log(`Migrated ${file} -> ${newFilePath}`);
  } else {
    console.log(
      `Skipped ${file} as there's already a ${ENTITY_FILE} file in the folder.`,
    );
  }
}

export async function migrateEntities(basePath: string) {
  const pattern = path.join(basePath, '**/!(*+page).md');
  const ignorePattern = path.join('src', 'templates', '**/*'); // Ignore pattern for src/templates
  const files = glob.sync(pattern, { ignore: ignorePattern });

  for (const file of files) {
    await migrateEntity(file);
  }
}

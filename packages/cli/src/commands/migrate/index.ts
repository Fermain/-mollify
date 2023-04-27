import { Command } from 'commander';
import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import slugify from 'slugify';

async function migrateFiles(basePath: string) {
  const pattern = path.join(basePath, '**/!(*+page).md');
  const ignorePattern = path.join('src', 'templates', '**/*'); // Ignore pattern for src/templates
  const files = glob.sync(pattern, { ignore: ignorePattern });

  for (const file of files) {
    const newDirName = slugify(path.basename(path.dirname(file)), {
      strict: true,
      lower: true,
    });
    const newDir = path.join(path.dirname(file), '..', newDirName);
    const newFilePath = path.join(newDir, '+page.md');

    if (!fs.existsSync(newFilePath)) {
      await fs.ensureDir(newDir);
      await fs.move(file, newFilePath);
      console.log(`Migrated ${file} -> ${newFilePath}`);
    } else {
      console.log(
        `Skipped ${file} as there's already a +page.md file in the folder.`,
      );
    }
  }
}

export default new Command('migrate')
  .arguments('[basePath]')
  .description('Migrate markdown files to the desired structure')
  .action(async (basePath = '') => {
    const filesToMigrate = glob.sync(path.join(basePath, '**/!(*+page).md'), {
      ignore: path.join('src', 'templates', '**/*'),
    }).length;

    if (filesToMigrate > 0) {
      console.log(`Migrating ${filesToMigrate} markdown files...`);
      await migrateFiles(basePath);
      console.log('Migration completed');
    } else {
      console.log('No markdown files found for migration');
    }
  });

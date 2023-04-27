import { Command } from 'commander';
import glob from 'glob';
import path from 'path';
import { migrateEntities } from '../../actions/migrateEntity';

export default new Command('migrate')
  .arguments('[basePath]')
  .description('Migrate markdown files to the desired structure')
  .action(async (basePath = '') => {
    const filesToMigrate = glob.sync(path.join(basePath, '**/!(*+page).md'), {
      ignore: path.join('src', 'templates', '**/*'),
    }).length;

    if (filesToMigrate > 0) {
      console.log(`Migrating ${filesToMigrate} markdown files...`);
      await migrateEntities(basePath);
      console.log('Migration completed');
    } else {
      console.log('No markdown files found for migration');
    }
  });

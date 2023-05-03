import { Command } from 'commander';
import glob from 'glob';
import path from 'path';
import { migrateEntities } from '../../actions/migrateEntity';

export default new Command('migrate')
  .arguments('[basePath]')
  .description('Migrate markdown files to the desired structure')
  .action(async (basePath = '') => {
    await migrateEntities(basePath);
  });

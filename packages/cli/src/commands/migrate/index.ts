import { Command } from 'commander';
import { prompt } from 'enquirer';
import { EntityType } from '../../types';
import listMarkdown from '../../actions/listMarkdown';
import migrateEntity from '../../actions/migrateEntity';

async function migrateEntityPrompt(entityType: EntityType, basePath = '') {
  const files = await listMarkdown(basePath);

  const { originPath, name } = await prompt<{
    originPath: string;
    name: string;
  }>([
    {
      type: 'autocomplete',
      name: 'originPath',
      message: `Which ${entityType} do you want to migrate?`,
      choices: files,
      initial: 0,
    },
    {
      type: 'input',
      name: 'name',
      message: `What is the name of the ${entityType}?`,
      validate(input) {
        return input.length > 0;
      },
    },
  ]);

  await migrateEntity(originPath, entityType, name);
}

export default new Command('migrate')
  .arguments('<entity-type>')
  .description('Migrate a markdown file to an entity')
  .action((entityType: EntityType) => {
    if (!Object.values(EntityType).includes(entityType)) {
      console.error(`Invalid entity type: ${entityType}`);
      process.exit(1);
    }

    migrateEntityPrompt(entityType)
      .then(() => console.log('Entity migrated'))
      .catch((error) => {
        console.error(`Error migrating entity: ${error.message}`);
        process.exit(1);
      });
  });

// @mollify/cli/src/commands/create/index.ts
import { Command } from 'commander';
import { prompt } from 'enquirer';
import createEntity from '../../actions/createEntity';
import { EntityType } from '@mollify/types';
import { slugger } from '../../utilities';

export default new Command('create')
  .arguments('[entity-type] [entity-name] [entity-slug]')
  .description('Create a new entity')
  .action(
    async (
      entityType?: EntityType,
      entityTitle?: string,
      entitySlug?: string,
    ) => {
      // If entityType is not provided, prompt for it
      if (!entityType) {
        const response = await prompt<{ entityType: EntityType }>({
          type: 'select',
          name: 'entityType',
          message: 'Select the type of entity you want to create:',
          choices: Object.keys(EntityType),
        });
        entityType = response.entityType;
      }

      // If entityName is not provided, prompt for it
      if (!entityTitle) {
        const response = await prompt<{ entityName: string }>({
          type: 'input',
          name: 'entityName',
          message: 'What is the name of the entity?',
        });
        entityTitle = response.entityName;
      }

      if (!entitySlug) {
        const slugPrompt = {
          type: 'input',
          name: 'slug',
          required: true,
          validate(input: string) {
            return input.length > 0;
          },
          message: `What is the slug of the ${entityType}?`,
          initial: slugger(entityTitle),
        };

        const { slug: promptedSlug } = await prompt<{ slug: string }>(
          slugPrompt,
        );
        entitySlug = promptedSlug;
      }

      try {
        const entity = await createEntity({
          type: entityType,
          title: entityTitle,
          slug: entitySlug!,
          tags: [],
        });
        console.log(
          `Successfully created a new ${entity.type} at ${entity.slug}`,
        );
      } catch (error) {
        console.error(`Error creating entity: ${error}`);
        process.exit(1);
      }
    },
  );

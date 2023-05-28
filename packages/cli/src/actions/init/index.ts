import { log } from 'console';
import { checkInstallation } from '../../utilities';
import assert from './assert';
import ensure from './ensure';
import prompts from '../../prompts';
import actions from '..';
import git from '../git';
import { PROMPT_ROOT_ENTITY_TITLE, PROMPT_ROOT_ENTITY_TYPE_SELECT, PROMPT_ROOT_ENTITY_TAGS } from '../../localisation';
import { ROOT_ENTITIES } from '../../constants';

export async function initialiseProject() {
  // Check the installation
  const report = await checkInstallation();
  assert.packagesInstalled(report);

  // Check if the content folder exists
  // If it doesn't flag the need for user input
  const { requiresUserInteraction } = await ensure.contentDir();

  if (requiresUserInteraction) {
    // Prompt the user to create the first entity
    const rootEntity = await prompts.entity.define(
      {},
      {
        title: PROMPT_ROOT_ENTITY_TITLE,
        type: PROMPT_ROOT_ENTITY_TYPE_SELECT,
        tags: PROMPT_ROOT_ENTITY_TAGS,
      },
      ROOT_ENTITIES,
    );
    await actions.entity.create(rootEntity, './content');
    log('Your project has been added to the content folder!');
    log('You can preview your project by running mollify preview.');
  }

  // Check if .gitignore exists
  // If it doesn't, create it
  await ensure.ignoreFile();

  // Check if a git repository exists
  // If it doesn't, create it
  await git.init();

  // Check if a symlink exists from content to a target folder
  // If it doesn't, create it
  await ensure.symlink();

  // Check if any submodules are missing or out of date
  // If they are, install or pull them
  await git.submodule.update();
}

import { log } from 'console';
import { checkInstallation } from '../../utilities';
import assert from './assert';
import ensure from './ensure';
import prompts from '../../prompts';
import actions from '..';

export async function initialiseProject() {
  // Check the installation
  const report = await checkInstallation();
  assert.packagesInstalled(report);

  // Check if the content folder exists
  // If it doesn't flag the need for user input
  const { requiresUserInteraction } = await ensure.contentDir();

  // Check if .gitignore exists
  // If it doesn't, create it
  await ensure.ignoreFile();

  // Check if a symlink exists from content to a target folder
  // If it doesn't, create it

  // Check if any submodules are missing
  // If they are, install them

  // Check if any submodules are out of date
  // If they are, update them

  if (requiresUserInteraction) {
    // Prompt the user to create the first entity
    const rootEntity = await prompts.entity.define({});
    await actions.entity.create(rootEntity, "./content");
    log("Your project has been added to the content folder!")
    log("You can preview your project by running mollify preview.")
  }
}

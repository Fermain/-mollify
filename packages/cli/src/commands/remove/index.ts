import fs from 'fs-extra';
import path from 'path';
import { EntityType } from '../../types';
import { prompt } from 'enquirer';

export async function remove(entityType: EntityType, slug?: string) {
  if (!slug) {
    // Look for a +page.md file in the current working directory
    const files = await fs.readdir(process.cwd());
    const pageFile = files.find((file) => file.endsWith('+page.md'));

    if (pageFile) {
      // Remove the parent directory of the +page.md file
      const parentDir = path.join(process.cwd(), path.dirname(pageFile));
      await fs.remove(parentDir);
      console.log('Entity removed');
    } else {
      console.error('No +page.md file found in the current working directory');
    }
  } else {
    // Confirm the removal
    // const { confirmed } = await prompt<{ confirmed: boolean }>([
    //   {
    //     type: 'confirm',
    //     name: 'confirmed',
    //     message: `Are you sure you want to remove the ${entityType} with slug "${slug}"?`,
    //     default: false,
    //   },
    // ]);

    // if (confirmed) {
    //   // await removeEntity(entityType, slug);
    //   console.log('Entity removed');
    // } else {
    //   console.log('Entity removal canceled');
    // }
  }
}

import path from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';
import type { EntityBase } from '@mollify/types';

// Get the path to the template file for the specified entity type
export function getTemplatePath(entityType: string): string {
  return path.join(__dirname, '../../', 'src/templates', entityType);
}

// Copy the template file for the specified entity type to the destination directory
// and optionally replace template variables with data
export async function copyTemplate(
  templatePath: string,
  destinationDir: string,
  entity?: EntityBase,
): Promise<void> {
  templatePath = getTemplatePath(templatePath);

  // Ensure the destination directory exists
  await fs.ensureDir(destinationDir);

  // Read the template directory and get the files
  const files = await fs.readdir(templatePath);

  // Iterate over each file
  for (const file of files) {
    const sourcePath = path.join(templatePath, file);

    // Form the destination path as a file in the destination directory
    // Use the original filename instead of replacing with '+page.md'
    let destPath = path.join(destinationDir, file);

    // Check if this is a directory
    if (fs.lstatSync(sourcePath).isDirectory()) {
      // If so, recursively call this function
      await copyTemplate(sourcePath, destPath, entity);
    } else {
      // If it's a file, read it
      let content = await fs.readFile(sourcePath, 'utf-8');

      // Replace variables if entity is provided
      if (entity && file === '+page.md') {
        content = replaceTemplateVariables(content, entity);
      }

      // Ensure the destination file will exist and write the content to it
      await fs.ensureFile(destPath);
      await fs.writeFile(destPath, content, 'utf-8');
    }
  }
}

// Replace template variables with data
function replaceTemplateVariables(content: string, entity: EntityBase): string {
  // Parse the frontmatter
  const { data: frontmatter, content: body } = matter(content);

  // Update the frontmatter with the entity data using the spread operator
  const updatedFrontmatter = {
    ...frontmatter,
    ...entity,
  };

  delete updatedFrontmatter.address;
  delete updatedFrontmatter.slug;
  delete updatedFrontmatter.children;

  // Create the updated content with the updated frontmatter
  return matter.stringify(body, updatedFrontmatter);
}

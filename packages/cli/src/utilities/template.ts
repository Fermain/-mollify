import path from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';
import type { Entity } from '@mollify/types';

// Get the path to the template file for the specified entity type
export function getTemplatePath(entityType: string): string {
  return path.join(__dirname, '../../', 'src/templates', entityType, '+page.md');
}

// Copy the template file for the specified entity type to the destination directory
// and optionally replace template variables with data
export async function copyTemplate(
  entityType: string,
  destination: string,
  entity?: Entity
): Promise<void> {
  const templatePath = getTemplatePath(entityType);
  let content = await fs.readFile(templatePath, 'utf-8');

  if (entity) {
    content = replaceTemplateVariables(content, entity);
  }

  await fs.ensureFile(destination);
  await fs.writeFile(destination, content, 'utf-8');
}

// Replace template variables with data
function replaceTemplateVariables(content: string, entity: Entity): string {
  // Parse the frontmatter
  const { data: frontmatter, content: body } = matter(content);

  // Update the frontmatter with the entity data using the spread operator
  const updatedFrontmatter = {
    ...frontmatter,
    ...entity,
  };

  // Create the updated content with the updated frontmatter
  return matter.stringify(body, updatedFrontmatter);
}

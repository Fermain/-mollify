import path from 'path';
import fs from 'fs-extra';
import matter from 'gray-matter';

// Get the path to the template file for the specified entity type
export function getTemplatePath(entityType: string): string {
  return path.join(__dirname, '..', 'templates', entityType, '+page.md');
}

// Copy the template file for the specified entity type to the destination directory
// and optionally replace template variables with data
export async function copyTemplate(
  entityType: string,
  destination: string,
  data?: Record<string, any>
): Promise<void> {
  const templatePath = getTemplatePath(entityType);
  let content = await fs.readFile(templatePath, 'utf-8');

  // Replace template variables with data (optional)
  if (data) {
    content = replaceTemplateVariables(content, data);
  }

  await fs.writeFile(destination, content, 'utf-8');
}

// Replace template variables with data
function replaceTemplateVariables(content: string, data: Record<string, any>): string {
  // Parse the frontmatter
  const { data: frontmatter, content: body } = matter(content);

  // Replace template variables in the frontmatter
  const updatedFrontmatter = Object.entries(frontmatter).reduce((result, [key, value]) => {
    if (typeof value === 'string') {
      result[key] = value.replace(/\{\{(\w+)\}\}/g, (_, variable) => data[variable] || '');
    } else {
      result[key] = value;
    }
    return result;
  }, {} as Record<string, any>);

  // Create the updated content with the updated frontmatter
  return matter.stringify(body, updatedFrontmatter);
}

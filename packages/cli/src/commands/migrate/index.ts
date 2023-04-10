import { Command } from 'commander';
import inquirer from 'inquirer';
import path from 'path';
import {
  countMarkdownFiles,
  recursivelyFindMarkdown,
  moveMarkdownFile,
} from '../../utilities';

async function migrate() {
  const projectRoot = process.cwd();
  const srcRoutesPath = path.join(projectRoot, 'content');
  const count = countMarkdownFiles(projectRoot);

  const { convert } = await inquirer.prompt<{
    convert: boolean;
  }>([
    {
      type: 'confirm',
      name: 'convert',
      message: 'Convert existing Markdown files to Mollify content?',
      when: count > 0,
      default: true,
    },
  ]);

  if (convert) {
    for await (const markdownFile of recursivelyFindMarkdown(projectRoot)) {
      await moveMarkdownFile(markdownFile);
    }
  }
}

const migrateCommand = new Command('migrate')
  .description('Migrate existing content to Mollify structure')
  .action(() => {
    migrate()
      .then(() => console.log('Migration completed'))
      .catch((error) => {
        console.error(`Error during migration: ${error.message}`);
        process.exit(1);
      });
  });

export default migrateCommand;

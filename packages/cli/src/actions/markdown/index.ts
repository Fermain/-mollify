import { migrateMarkdownFile, migrateMarkdownFiles } from "./migrate";

export default {
  migrate: {
    file: migrateMarkdownFile,
    files: migrateMarkdownFiles
  }
}
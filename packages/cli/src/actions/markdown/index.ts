import { migrateMarkdownFile, migrateMarkdownFiles } from "./migrate";
import { migrateMarkdownImages } from "./images/migrate";

export default {
  migrate: {
    file: migrateMarkdownFile,
    files: migrateMarkdownFiles,
    images: migrateMarkdownImages
  }
}
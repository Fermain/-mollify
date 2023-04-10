import fs from 'fs-extra';
import path from 'path';

async function* readDirAsyncIterable(dir: string, options?: {
  encoding: BufferEncoding | null;
  withFileTypes?: false | undefined;
}): AsyncIterable<fs.Dirent> {
  const entries = await fs.readdir(dir, { ...options, withFileTypes: true });
  for (const entry of entries) {
    yield entry;
  }
}

export async function* recursivelyFindMarkdown(root: string, ignore: string[] = ['node_modules']): AsyncIterable<string> {
  for await (const entry of readDirAsyncIterable(root)) {
    const entryPath = path.join(root, entry.name);

    if (entry.isFile() && entry.name.endsWith('.md')) {
      yield entryPath;
    } else if (entry.isDirectory() && !ignore.includes(entry.name)) {
      yield* recursivelyFindMarkdown(entryPath, ignore);
    }
  }
}

function shouldIgnoreFile(fileName: string, ignore: string[] = []): boolean {
  return fileName.startsWith('+') || ignore.includes(fileName.toLowerCase());
}

export function countMarkdownFiles(root: string, ignore: string[] = ['node_modules', 'readme']): number {
  let count = 0;

  for (const entry of fs.readdirSync(root)) {
    const entryPath = path.join(root, entry);

    if (entry.endsWith('.md') && !shouldIgnoreFile(entry, ignore)) {
      count++;
    } else if (fs.statSync(entryPath).isDirectory() && !ignore.includes(entry)) {
      count += countMarkdownFiles(entryPath, ignore);
    }
  }

  return count;
}

export async function moveMarkdownFile(filePath: string, ignore: string[] = ['node_modules', 'readme']): Promise<void> {
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath, '.md');

  if (shouldIgnoreFile(fileName, ignore)) {
    return;
  }

  // Get the project root and content directory
  const projectRoot = path.resolve(process.cwd());
  const contentDir = path.join(projectRoot, 'content');

  let newFilePath: string;
  let newDir: string;

  // If the file is in the project root, move it to /content/fileName/+page.md
  if (fileDir === projectRoot) {
    newFilePath = path.join(contentDir, fileName, '+page.md');
    newDir = path.dirname(newFilePath);
  } else {
    // If the file is not in the project root, move it to fileName/+page.md
    newDir = path.join(fileDir, fileName);
    newFilePath = path.join(newDir, '+page.md');
  }

  await fs.ensureDir(newDir);
  await fs.move(filePath, newFilePath, { overwrite: true });
}


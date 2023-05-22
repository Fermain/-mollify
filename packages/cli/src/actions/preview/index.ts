import { spawn } from 'child_process';
import path from 'path';
import { PACKAGE_INVENTORY } from '../../constants';

export function previewProject(
  projectPath: string = process.cwd(),
): Promise<void> {
  return new Promise((resolve, reject) => {
    const [LMS] = PACKAGE_INVENTORY;

    const mollifyLmsPath = path.join(projectPath, 'node_modules', LMS);

    const dev = spawn('npm', ['run', 'dev'], {
      cwd: mollifyLmsPath,
      stdio: 'inherit',
    });

    dev.on('error', (error: Error) => {
      console.error(`Error: ${error.message}`);
      reject(error);
    });

    dev.on('close', (code: number) => {
      console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
}

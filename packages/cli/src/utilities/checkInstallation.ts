import { exec } from 'child_process';
import { PACKAGE_INVENTORY } from '../constants';

// Main function to check packages
export function checkInstallation() {
  exec('npm list --json', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    // Parse the npm list output
    const json = JSON.parse(stdout);

    // Create a checklist object with all packages set to false (not found)
    const checklist: Record<string, boolean> = Object.fromEntries(
      PACKAGE_INVENTORY.map((pkg) => [pkg, false]),
    );

    // Check if each package is in the dependencies of the npm list output
    PACKAGE_INVENTORY.forEach((packageName) => {
      if (json.dependencies && json.dependencies[packageName]) {
        checklist[packageName] = true;
      }
    });

    return checklist;
  });
}

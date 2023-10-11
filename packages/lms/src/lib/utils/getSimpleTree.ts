import dirTree from 'directory-tree';
/**
 * Retrieves a simplified tree structure of the contents within a specified directory.
 *
 * This function starts from the 'content/' directory and generates a tree structure
 * representing the contents of the specified directory and its subdirectories.
 *
 * @param {string} dir - The path to the directory within the 'content/' folder for which to generate the tree.
 * @returns {Object} An object representing the directory tree structure, including file types and extensions.
 * @throws {Error} Throws an error if the specified directory does not exist.
 *
 * @example
 * // Get a simplified tree structure for the 'example-folder' within 'content/'
 * const treeStructure = getSimpleTree('Hackademics/Database Fundamentals');
 * console.log(treeStructure);
 */
export function getSimpleTree (dir: string) {
    const baseDir = './src/routes/content/'
    const modifiedDir = `${baseDir}${dir}`;
    const directoryTree = dirTree(modifiedDir, {normalizePath: true, attributes: ["type", "extension"] })
    return directoryTree;
}


import fs from 'fs-extra';
import path from 'path';

function formStaticPath(image: string, contentFilePath: string, staticContentPath: string) {
    const slug = path.join(contentFilePath.split("/src/routes/content/")[1].replace("/+page.md", ""), image);
    return path.join(staticContentPath, slug);
}

export async function migrateMarkdownImages(
    contentFilePath: string,
    imageArchivePath: string,
    staticContentPath: string
) {
    // Read the content file
    const content = fs.readFileSync(contentFilePath, 'utf8');

    // Regular expression to match markdown image syntax
    const regex = /!\[.*?\]\((.*?\\?)\)/g;

    // Extract all image paths
    const imagePaths = Array.from(content.matchAll(regex));

    const contentDirName = path.dirname(contentFilePath).split("/").at(-1);

    // Update each image URL in the content
    let updatedContent = content;
    for (const match of imagePaths) {
        const imageUrl = match[1].replace(/\\+/g, "");

        // Compute the new URL
        const newUrl = path.basename(imageUrl);

        // Replace the old URL with the new URL in the content
        updatedContent = updatedContent.replace(match[1], `${contentDirName}/${newUrl}`);

        // Compute the old and new file paths
        const oldFilePath = path.join(imageArchivePath, imageUrl);
        const newFilePath = formStaticPath(newUrl, contentFilePath, staticContentPath);

        // ensure the directory exists deeply
        fs.ensureDirSync(path.dirname(newFilePath));

        if (!fs.existsSync(newFilePath) && fs.existsSync(oldFilePath)) {
            // Copy the image file to the new location
            fs.copyFileSync(oldFilePath, newFilePath);
        }
    }

    // Write the updated content back to the file
    fs.writeFileSync(contentFilePath, updatedContent, 'utf8');
}

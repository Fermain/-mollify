export function fileIsInContent(filePath: string) {
    const split = filePath.split("src/routes/content");

    switch (split.length) {
        case 1:
        case 0:
            return false;
        case 2:
            return true;
        default:
            throw new Error("Multiple src/routes/content folders found in file path.")
    }
}
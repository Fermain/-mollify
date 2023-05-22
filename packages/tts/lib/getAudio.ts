import fs from "fs";
import path from "path";

//might request the full path to the file
export async function getAudio(slug: string) {
  console.log("getAudio", slug);
  const filePath = path.join("public", "audio", `${slug}.mp3`);
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    return JSON.stringify({ file: `${slug}.mp3`, url: `/public/audio/${slug}.mp3`, exists: true });
  } else {
    return JSON.stringify({ error: "File Not Found", url: `/public/audio/no_audio/no-audio.mp3`, exists: false });
  }
}

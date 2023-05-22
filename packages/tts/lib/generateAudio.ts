import fs from "fs";
import path from "path";
import transform from "./transform";

export async function generateAudio(content: string, slug: string, filepath: string, ELEVENLABS_API_KEY: string, replace = false) {
  const transformedContent = transform.all(content);
  const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
  const filePath = path.join("public", "audio", `${slug}.mp3`);
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    if (!replace) {
      return JSON.stringify({ file: `${slug}.mp3`, url: `/public/audio/${slug}.mp3` });
    }
  }

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: {
        accept: "audio/mpeg",
        "content-type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: transformedContent,
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      }),
    });

    if (response.ok) {
      if (replace) {
        console.log("file deleted");
        fs.unlinkSync(filePath);
      }
    } else {
      console.log("creation error");
      if (fs.existsSync(filePath)) {
        return JSON.stringify({ error: "Bad request, creation failed", url: `/public/audio/${slug}.mp3`, response });
      }
      return JSON.stringify({ error: "Bad request, creation failed", url: `/public/audio/no_audio/no-audio.mp3`, response });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const file = slug;

    const audioDir = path.join("public", "audio");
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    console.log("success");
    await fs.promises.writeFile(path.join("public", "audio", `${file}.mp3`), buffer);
    return JSON.stringify({ file: `${file}.mp3`, url: `/public/audio/${file}.mp3` });
  } catch (error: any) {
    console.error("Error generating audio:", error);
  }
}

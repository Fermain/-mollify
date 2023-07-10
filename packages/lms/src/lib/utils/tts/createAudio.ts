export async function createAudio(slug: string, content: string, path: string, replace = false) {
  try {
    const response = await fetch(`/api/tts/createAudio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ slug, content, path, replace })
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return { error: 'An error occurred', errorContent: error };
  }
}

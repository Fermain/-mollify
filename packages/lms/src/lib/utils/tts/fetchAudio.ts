export async function fetchAudio(slug: string) {
  const response = await fetch(`/api/tts/getAudio`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ slug })
  });
  const data = await response.json();
  return data;
}

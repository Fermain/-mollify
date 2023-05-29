export async function GET(): Promise<Response> {
	const res = await fetch(
		'https://raw.githubusercontent.com/Melisa-Zorraindo/remote-markdown-sample/main/README.md'
	);

	const item = await res.text();

	return new Response(item, {
		headers: {
			'Content-type': 'text/html'
		}
	});
}

import { compile } from 'mdsvex';

export async function GET(): Promise<Response> {
	const res = await fetch(
		'https://rawgithubusercontent.com/Melisa-Zorraindo/auction-house-website/main/README.md'
	);

	const item = await res.text();

	const { code: compiledResponse } = await compile(item);

	return new Response(compiledResponse, {
		headers: {
			'Content-type': 'text/html'
		}
	});
}

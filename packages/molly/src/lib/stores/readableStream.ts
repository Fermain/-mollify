import { writable } from 'svelte/store';

export function readableStreamStore() {
	const { subscribe, set, update } = writable({ loading: false, text: '' });

	async function request(request: Request) {
		set({ loading: true, text: '' });

		try {
			const response = await fetch(request);

			if (!response.ok) throw new Error(response.statusText);
			if (!response.body) return;

			const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
			let result = '';

			while (true) {
				const { value: token, done } = await reader.read();

				if (token != undefined)
					update((val) => {
						result = val.text + token;
						return { loading: false, text: result };
					});
				if (done) break;
			}

			return result;
		} catch (err: any) {
			set({ loading: false, text: err.toString() });
			throw err;
		}
	}

	return { subscribe, request };
}

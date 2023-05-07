import api from './api';

export async function flagged(input: string) {
	return (await moderate(input)).some((result) => result.flagged);
}

export async function moderate(input: string) {
	const {
		data: { results }
	} = await api.createModeration({ input });

	return results;
}

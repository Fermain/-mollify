export const load = async ({ fetch }) => {
	const response = await fetch(`/api/fetchAllLocal`);
	const files = await response.json();

	return {
		files
	};
};

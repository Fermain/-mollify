import headings from './headings';

const heuristics = {
	headings
};

function all(input: string) {
	return Object.values(heuristics).reduce(
		(currentInput, heuristic) => heuristic(currentInput),
		input
	);
}

export default { headings, all };

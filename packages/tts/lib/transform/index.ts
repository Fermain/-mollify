import markdown from './markdown';
import links from './links';

const heuristics = {
	markdown,
	links
};

function all(input: string) {
	return Object.values(heuristics).reduce(
		(currentInput, heuristic) => heuristic(currentInput),
		input
	);
}

export default { markdown, links, all };

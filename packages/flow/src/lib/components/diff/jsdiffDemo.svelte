<script>
	import * as Diff from 'diff';

	const one =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
	const other =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim jacta, quis nostrud exercitation ullamco laboris nisi ut aliquip est ea commodo consequat. Dui faucibus in ornare quam viverra orci sagittis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum alea eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

	const diff = Diff.diffWordsWithSpace(one, other);

	export let test = diff
		.map((part) => {
			const color = part.added ? '#97f295' : part.removed ? '#ffb6ba' : '#eee';
			const chunk = `<span style="background-color: ${color};">${part.value}</span>`;
			return chunk;
		})
		.join('');
</script>

<div class="demo pull-request">
	{@html test}
</div>

<style>
	div {
		border: 1px solid #ddd;
		padding: 2rem 1rem;
	}
</style>

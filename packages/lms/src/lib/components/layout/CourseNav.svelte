<script lang="ts">
	import { onMount } from 'svelte';
	import RecursiveNav from '../nav/RecursiveNav.svelte';

	let institutes = {};

	onMount(async () => {
		const response = await fetch('/api/parseMarkdown');
		institutes = await response.json();

		console.log(institutes);
	});
</script>

<main>
	<div>
		<nav>
			<RecursiveNav data={institutes} />
		</nav>
		<section>
			<slot />
		</section>
	</div>
</main>

<style>
	@media (min-width: 768px) {
		div {
			display: grid;
			grid-template-columns: 1fr 3fr;
			gap: 2rem;
		}
	}
</style>

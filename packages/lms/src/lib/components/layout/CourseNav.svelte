<script lang="ts">
	import { onMount } from 'svelte';
	import RecursiveNav from '../nav/RecursiveNav.svelte';
	import { files } from '$lib/stores/files.ts';

	let institutes = {};

	onMount(async () => {
		const unsubscribe = files.subscribe((data) => {
			institutes = data;
		});
		return () => unsubscribe();
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
	main {
		padding: 1rem;
	}
	@media (min-width: 768px) {
		div {
			display: grid;
			grid-template-columns: 1fr 3fr;
			gap: 2rem;
		}
	}
</style>

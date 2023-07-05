<script lang="ts">
	import type { EntityMeta } from "@mollify/types";

	export let result: EntityMeta;
</script>

<a class="card p-4 variant-ghost-surface no-underline dark:text-slate-100" href={result.browserPath}>
	<header class="card-header border-b flex justify-between items-baseline gap-3 p-0">
		<h3 class="h3">{result.title}</h3>
		<span class="chip variant-filled">{result.type}</span>
	</header>
	<footer class="card-footer p-0 pt-2">
		{#each result.tags as tag}
			<p class="chip variant-ringed m-1 ms-0 pt-2">{tag}</p>
		{/each}
	</footer>
</a>

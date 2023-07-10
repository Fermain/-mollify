<script lang="ts">
	export let tag = "";
</script>

{#if tag}
<a href={"/tags/" + tag} class="inline-block no-underline text-black px-1 bg-blue-200 rounded-md tag not-prose">{tag}</a>
{/if}
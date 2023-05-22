<script lang="ts">
	import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
</script>

<main class="p-3">
	<div class="prose">
		<ProgrammeNav>
			<slot />
		</ProgrammeNav>
	</div>
</main>

<script lang="ts">
	let fontSize: number = 16;
	let themeChoice: string;
</script>

<div class="settings">
	<div class="font-size-selector">
		<span
			id="font-plus"
			on:click={() => {
				fontSize++;
			}}>A +</span
		>
		<span
			id="font-minus"
			on:click={() => {
				fontSize--;
			}}
		>
			A -</span
		>
	</div>
	<label>Theme</label>
</div>

<style>
	.settings {
		grid-area: settings;
	}

	.settings,
	.font-size-selector {
		display: flex;
		gap: 1rem;
	}
</style>

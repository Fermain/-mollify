<script lang="ts">
	let fontSize: number = 16;
	let themeChoice: string;
	let isActive: Boolean = false;
</script>

<div class="wrapper">
	<button
		class="ghost"
		on:click={() => {
			isActive = !isActive;
		}}
		on:keydown={(evt) => {
			if (evt.key === 'Enter') isActive = !isActive;
		}}
	>
		<i class="icon-f">settings</i>
	</button>
	{#if isActive}
		<div class="settings">
			<div class="font-size-selector">
				<span
					id="font-plus"
					on:click={() => {
						fontSize++;
					}}
					on:keydown={(evt) => {
						if (evt.key === 'Enter') fontSize++;
					}}>A +</span
				>
				<span
					id="font-minus"
					on:click={() => {
						fontSize--;
					}}
					on:keydown={(evt) => {
						if (evt.key === 'Enter') fontSize--;
					}}
				>
					A -</span
				>
			</div>
			<label>Theme</label>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		margin-left: auto;
		align-self: center;
	}

	.settings {
		position: absolute;
		background-color: var(--primary);
		color: white;
		right: 0;
		padding: var(--spacing-m);
		border-radius: var(--border-radius-xs);
	}

	.settings,
	.font-size-selector {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>

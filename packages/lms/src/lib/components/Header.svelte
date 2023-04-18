<script lang="ts">
	let fontSize: number = 16;
	let themeChoice: string;
	let searchValue: string;
</script>

<header>
	<h1>Mollify</h1>
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
		<input type="search" bind:value={searchValue} placeholder="Search..." />
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		max-width: 80ch;
		margin: 0 auto;
	}

	.settings {
		display: flex;
		gap: 1rem;
	}
</style>

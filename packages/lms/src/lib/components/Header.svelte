<script lang="ts">
	let fontSize: number = 16;
	let themeChoice: string;
	let searchValue: string;
</script>

<header>
	<div class="wrapper">
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
	</div>
</header>

<style lang="scss">
	header {
		background-color: var(--primary);
	}

	.wrapper {
		display: flex;
		align-items: center;
		width: 100%;
		justify-content: space-between;
		max-width: 1024px;
		margin: 0 auto;
		color: var(--white);
		padding: var(--spacing-s) 0;
	}

	h1 {
		margin: 0;
	}

	.settings,
	.font-size-selector {
		display: flex;
		gap: 1rem;
	}
</style>

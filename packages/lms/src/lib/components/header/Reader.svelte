<script lang="ts">
	let searchValue: String;
</script>

<input type="search" bind:value={searchValue} placeholder="Search..." />

<style>
	input {
		grid-area: reader;
	}
</style>

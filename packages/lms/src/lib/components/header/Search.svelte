<script lang="ts">
	import { browser } from '$app/environment';

	let windowWidth = browser ? window.innerWidth : null;
	let searchIconClicked: boolean = false;

	function handleResize() {
		windowWidth = browser ? window.innerWidth : null;
	}

	function toggleSearch() {
		searchIconClicked = !searchIconClicked;
		console.log(searchIconClicked);
	}
</script>

<form class="search">
	<input type="search" placeholder="Search" id="search-input" />
	<button on:click={toggleSearch}>Search</button>
</form>

<style lang="scss">
	.search {
		display: flex;
		flex: 1;
		border: 1px solid blue;

		& input {
			width: 100%;
			background-color: red;
		}
	}
</style>

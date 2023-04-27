<script lang="ts">
	let searchValue: String;
</script>

<div class="reader">
	<div class="reader-inner">Reader</div>
</div>

<style>
	.reader {
		grid-area: reader;
		width: 100%;
		padding: var(--spacing-s) var(--spacing-l);
		margin: 0 auto;
		text-align: center;
	}

	.reader-inner {
		background-color: var(--background-primary);
		width: 80%;
		border-radius: var(--border-radius-xs);
		margin: 0 auto;
	}
</style>

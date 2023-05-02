<script lang="ts">
	let searchValue: String;
</script>

<div class="reader">
	<audio controls class="reader-inner">
		<source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
		<source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
		Your browser does not support the audio element.
	</audio>
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

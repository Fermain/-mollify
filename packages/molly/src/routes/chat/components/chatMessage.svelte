<script lang="ts">
	export let message: Object;
</script>

<div class="message-wrapper">
	<strong>{message.name}</strong>
	<p>{message.content}</p>
</div>

<style lang="scss">
	.message-wrapper {
		display: flex;
		flex-direction: column;
		color: white;
		max-width: 100%;
		margin: 0;
		background-color: #323e47e8;
		cursor: default;
		padding: 10px;
	}

	p {
		padding: 0;
		margin: 0;
	}
</style>

<script lang="ts">
	export let message: { name: string; content: string; };
</script>

<div class="message-wrapper">
	<!-- <img src="" alt="avatar" /> -->
	<strong>{message.name}</strong> <!--This can be removed and only img used-->
	<p>{message.content}</p>
</div>

<style lang="scss">
	.message-wrapper {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		color: white;
		max-width: 100%;
		margin: 0;
		background-color: #323e47b8;
		cursor: default;
		padding: 10px;
	}

	p {
		padding: 0;
		margin: 0;
	}

	/*img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px;
	}*/
</style>

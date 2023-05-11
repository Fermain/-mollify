<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import sendChat from './icons/paper-plane.svg'
  
	export let img: string = sendChat;
  
	let textarea: HTMLTextAreaElement;

  const dispatch = createEventDispatcher();

  function onInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;

		//sets initial height to prevent expanding when typing starts
		textarea.style.height = '20px';

		//adjusts height as needed until reaching max-height specified in css class
		textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function onSubmit(event: Event) {
    const form = event.target as HTMLFormElement;
    const textarea = form.querySelector("textarea")!;
    const message = textarea.value.trim();
    dispatch("user", message);
  }
	
</script>

<form on:submit|preventDefault={onSubmit}>
  <textarea on:input={onInput} cols="30" rows="10" bind:this={textarea}></textarea>
  <button><img src={img} alt="send message"/></button>
</form>

<style>

	form {
		background-color: #323d47;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	textarea {
		max-width: 70%;
		min-width: 70%;
		max-height: 100px;
		border-radius: 5px;
		padding: 5px;
		resize: none; /*prevents the user from manually resizing the field*/
	}

	button {
		padding: 10px;
		width: 50px;
		border: none;
		border-radius: 10px;
		background-color: #21a299;
		color: white;
		cursor: pointer;
	}

	img {
		width: 20px;
		height: 20px;
	}
</style>

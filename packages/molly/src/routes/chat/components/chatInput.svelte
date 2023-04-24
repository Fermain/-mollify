<script lang="ts">
  import sendChat from '../logo/paper-plane.svg';
  export let img: string = sendChat;

  interface Message {
      role: 'user' | 'assistant';
      content: string;
  }

  const messages: Message[] = [];

  function sendMessage(): void {
      const textarea: HTMLTextAreaElement | null = document.querySelector('textarea');
      if (!textarea) return;

      const content: string = textarea.value.trim();

      if (content !== '') {
          const message: Message = {
              role: 'user',
              content: content
          };

          messages.push(message);
          console.log(messages);

          // Call an API or a function to get a response from the assistant
          // and add it to the messages array with a role of "assistant"

          // Clear the textarea
          textarea.value = '';
      } else {
          // Display an error message if the textarea is empty
          alert('Please enter a message.');
      }
  }

</script>

<style>
    .chat-input {
  background-color: #323D47;
  padding: 10px;
  }
  
  .chat-input form {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  }
  
  .chat-input textarea {
  max-width: 70%;
  min-width: 70%;
  min-height: 30px;
  max-height: 200px;
  border-radius: 5px;
  padding: 5px;
  }

  .chat-input button {
  padding: 10px;
  width: 50px;
  border: none;
  border-radius: 10px;
  background-color: #21A299;
  color: white;
  cursor: pointer;
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>

<div class="chat-input">
  
  <form on:submit|preventDefault={sendMessage}>

   <textarea placeholder="Ask Molly"/>

   <button><img src={img} alt="send message"></button>

  </form>

</div>
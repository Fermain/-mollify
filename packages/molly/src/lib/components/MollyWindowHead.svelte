<!--
  THIS IS NOT IN USE RIGHT NOW
-->

<script lang="ts">
import Logo from './MollyIcon.svelte';
import closeButton from './icons/angle-small-down.svg'
let img: string = closeButton;

export let isOpen = false;

function onClick() {
  isOpen = !isOpen;
}

</script>

<div class="container">
  <div class="assistant-molly">
    <Logo/>
    <h4>Ask Molly</h4>
  </div>
  <button on:click={onClick}><img src={closeButton} alt="close chat"></button>
</div>




<style>

.container {
 display: flex; 
 justify-content: space-between;
 align-content: center;
 background-color: #323d47;
 margin: 0px;
 padding: 10px;
}

.assistant-molly{
  display: flex;
  flex-direction: row;
  align-self: flex-start;
}

h4 {
  color: white;
  margin: 10px 0px 0px 10px;
  cursor: default;
}

button {
  background-color: #21A299;
  border-radius: 10px;
  width: 50px;
  border: none;
  color: white; 
  cursor: pointer;
  }

img {
  padding: 0;
    width: 30px;
    height: 30px;
}
</style>
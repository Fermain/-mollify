<script lang=ts>
import closeChat from "./icons/angle-small-down.svg";
export let expanded: boolean = false;
export let img: string = closeChat;

export let expandButton = () => {
  expanded = !expanded;
}

</script>

<style>
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


<button on:click={expandButton}><img src={img} alt="close chat"></button>

<script lang=ts>
export let expanded: boolean = false;

export let expandButton = () => {
  expanded = !expanded;
}

</script>

<style>
  button {
    padding: 10px;
  background-color: #323E47;
  border: none;
  color: white; 
  cursor: pointer;
  }


</style> 


<button on:click={expandButton}>V</button>

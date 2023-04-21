<script lang=ts>
export let expanded: boolean = false;

export let command: string; 
</script>

<style>
  button {
  padding: 10px;
  border: 1px solid #0f5a8f;
  border-radius: 5px;
  background-color: #065285;
  color: white;
  cursor: pointer;
  }
</style>

<button on:click={() => expanded = !expanded}>{command}</button>
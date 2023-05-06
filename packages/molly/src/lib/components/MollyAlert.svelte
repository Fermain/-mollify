<script lang="ts">
  export let type: 'success' | 'info' | 'warning' | 'danger' = 'info';
  export let message: string;
</script>

<div class={`alert alert-${type}`}>{message}</div>
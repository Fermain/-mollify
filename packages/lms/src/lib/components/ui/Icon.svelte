<script lang="ts">
  export let name: string;
  export let variant:string;
  import 'material-icons/iconfont/material-icons.css';
</script>

<span class={variant? `material-icons-${variant}`: 'material-icons'} {...$$restProps}>{name}</span>

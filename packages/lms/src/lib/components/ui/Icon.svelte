<script lang="ts">
  export let name: string;
  export let variant = "";
  import 'material-icons/iconfont/material-icons.css';
</script>
<!-- Default variant is "filled". Please give variant type (outlined/round/sharp/two-tone) as prop if you want to change-->
<!-- https://www.npmjs.com/package/material-icons#usage -->
<span class={variant? `material-icons-${variant}`: 'material-icons'} {...$$restProps}>{name}</span>

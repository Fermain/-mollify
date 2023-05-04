<script>
  import callouts from "remark-emoji-callout";
</script>

# This is the heading

> ⛔ Title
>
> Is this working?

> ✅ Title
>
> Is this working?

> 💡 Title
>
> Is this working?

> 👍 Title
>
> Is this working?

<style lang="scss">
.callout {
  border-radius: 2px;
  padding: 10px;
  border-left: solid 5px var(--primary-dk);
  &.👍 {
    background-color: var(--primary-ltst);
  }
  &.💡{
    background: blue;
  }
  &.⛔{
    background: red;
  }
  &.✅{
    background: green;
  }
}
</style>

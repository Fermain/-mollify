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
  background-image: linear-gradient(to right, var(--background-primary-lt), var(--background-primary-ltr));
  &.👍 {
    border-left: solid 7px var(--secondary);
  }
  &.💡{
    border-left: solid 7px var(--secondary-lt);
  }
  &.⛔{
    border-left: solid 7px var(--warning);
  }
  &.✅{
    border-left: solid 7px var(--success);
  }
}

.callout-title {
  font-size: var(--font-size-m);
}

.callout p {
  padding-left: var(--spacing-m)
}
</style>

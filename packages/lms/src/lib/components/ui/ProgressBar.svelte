<script lang="ts">
  import { ProgressBar } from '@skeletonlabs/skeleton';

  export let value = 0;
</script>

<div class="flex items-center gap-2 flex-wrap">
  <div class="min-w-[120px] flex-1">
    <ProgressBar {value} />
  </div>
  <div class="flex min-w-fit">
    <span>{value.toFixed(0)}% completed</span>
    <!-- <button class="ms-3">reset</button> -->
  </div>
</div>

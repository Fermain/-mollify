<script lang="ts">
  import ProgrammeNav from '../navigation/ProgrammeNav.svelte';
</script>

<main class="px-5 py-2 w-full relative">
  <div class="prose max-w-none" id="prose-container">
    <ProgrammeNav>
      <slot />
    </ProgrammeNav>
  </div>
</main>

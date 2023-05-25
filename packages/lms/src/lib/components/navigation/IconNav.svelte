<script lang="ts">
	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import AddRemoveBookmarks from './icons/AddRemoveBookmarks.svelte';
</script>

<AppRail width="w-[3rem] sm:w-20">
	<AppRailTile name="tile-1" value={0}><i class="icon-f">home </i></AppRailTile>
	<AppRailTile value={1}><i class="icon-f">bookmark</i></AppRailTile>
	<AddRemoveBookmarks />
</AppRail>

<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { modalStore } from '@skeletonlabs/skeleton';
	import BookmarkList from './BookmarkList.svelte';
	import 'material-icons/iconfont/material-icons.css';

	const modalComponent = {
		Logo: {
			ref: BookmarkList
		}
	};

	const searchModal: ModalSettings = {
		type: 'component',
		component: 'Logo'
	};
</script>

<div>
	<button
		name="tile-2"
		class="app-rail-tile unstyled grid place-content-center place-items-center w-full aspect-square space-y-1.5 cursor-pointer bg-primary-hover-token"
		on:click={() => modalStore.trigger(searchModal)}
	>
		<span class="material-icons">bookmark</span>
	</button>

	<Modal components={modalComponent} />
</div>

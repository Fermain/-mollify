<script lang="ts">
	import { LightSwitch, popup, storePopup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const settings: PopupSettings = {
		event: 'click',
		target: 'settings',
		placement: 'bottom'
	};
</script>

<div>
	<button class="btn hover:bg-primary-hover-token" use:popup={settings}
		><span class="material-symbols-outlined"> settings </span></button
	>

	<div class="card p-4 w-60 shadow-xl" data-popup="settings">
		<h3 class="h3 mb-3">Settings</h3>
		<hr />
		<div class="flex justify-between my-5">
			<span>Theme</span>
			<LightSwitch />
		</div>
		<div class="flex justify-between my-5">
			<span class="p-1">Text</span>
			<div class="flex gap-4">
				<button class="btn hover:bg-primary-hover-token p-1"
					><span class="material-symbols-outlined"> text_increase </span></button
				>
				<button class="btn hover:bg-primary-hover-token p-1"
					><span class="material-symbols-outlined"> text_decrease </span></button
				>
			</div>
		</div>
	</div>
</div>

<!-- <script lang="ts">
	let fontSize: number = 16;
	let themeChoice: string;
	let isActive: Boolean = false;
</script>

<div class="wrapper">
	<button
		class="ghost"
		on:click={() => {
			isActive = !isActive;
		}}
		on:keydown={(evt) => {
			if (evt.key === 'Enter') isActive = !isActive;
		}}
	>
		<i class="icon-f">settings</i>
	</button>
	{#if isActive}
		<div class="settings">
			<div class="font-size-selector">
				<span
					id="font-plus"
					on:click={() => {
						fontSize++;
					}}
					on:keydown={(evt) => {
						if (evt.key === 'Enter') fontSize++;
					}}>A +</span
				>
				<span
					id="font-minus"
					on:click={() => {
						fontSize--;
					}}
					on:keydown={(evt) => {
						if (evt.key === 'Enter') fontSize--;
					}}
				>
					A -</span
				>
			</div>
			<label>Theme</label>
		</div>
	{/if}
</div>
 -->

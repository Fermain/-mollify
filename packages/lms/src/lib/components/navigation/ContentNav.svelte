<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import RecursiveNav from './RecursiveNav.svelte';
	import CourseNav from './CourseNav.svelte';
	import { getCurrentPageEntityMeta } from '$lib/utils/getCurrentPageEntityMeta';
	import type { EntityMeta } from '@mollify/types';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	let institutes: EntityMeta[] | null = [];
	let current: EntityMeta | undefined;
	let isCourse = false;
	let pathArray: string[] = [];
	let currentPath: string;

	onMount(async () => {
		if ($files === null) {
			const response = await fetch('/api/getEntityMetaTree');
			const data = await response.json();
			files.set(data);
		}
	});

	function updatePath() {
		const path = browser ? window.location.pathname.replaceAll(`%20`, ' ') : '';
		const objectPath = path.replace('/content/', '');
		pathArray = objectPath.split('/');
		currentPath = pathArray[pathArray.length - 1];
	}

	if (browser) {
		updatePath();
		current = getCurrentPageEntityMeta(institutes, pathArray);
	}

	$: {
		if ($files) {
			institutes = $files;
			current = getCurrentPageEntityMeta(institutes, pathArray);
		}
		page.subscribe(() => {
			updatePath();
		});
		isCourse = current?.type === 'Course';
	}
</script>

<div class="outer-wrapper">
	<Accordion>
		{#if institutes}
			<AccordionItem>
				<svelte:fragment slot="summary">Main Menu</svelte:fragment>
				<div slot="content">
					<RecursiveNav data={institutes} />
				</div>
			</AccordionItem>
		{/if}
		{#if isCourse}
			<AccordionItem>
				<!-- If current path is to a course/module/lesson -->
				<svelte:fragment slot="summary">Course Nav</svelte:fragment>
				<div slot="content">
					<CourseNav data={current} />
				</div>
			</AccordionItem>
		{/if}
	</Accordion>
</div>

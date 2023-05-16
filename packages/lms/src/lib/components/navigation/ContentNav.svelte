<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import RecursiveNav from './RecursiveNav.svelte';
	import CourseNav from './CourseNav.svelte';
	import type { EntityMeta } from '@mollify/types';
	import { Accordion } from '@skeletonlabs/skeleton';

	let institutes: EntityMeta[] | null = [];
	let current: EntityMeta | undefined;
	let isCourse = false;
	let pathArray: string[] = [];
	let currentPath: string;

	let windowWidth = browser ? window.innerWidth : null;
	let recNavClicked: boolean = false;
	let courseNavClicked: boolean = false;

	onMount(async () => {
		if ($files === null) {
			const response = await fetch('/api/parseMarkdown');
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
		current = getCurrent(institutes, pathArray);
	}

	$: {
		if ($files) {
			institutes = $files;
			current = getCurrent(institutes, pathArray);
		}
		page.subscribe((data) => {
			updatePath();
		});
		isCourse = current?.type === 'course';
	}

	function handleResize() {
		windowWidth = browser ? window.innerWidth : null;
	}

	function toggleRecursiveNav() {
		recNavClicked = !recNavClicked;
	}

	function toggleCourseNav() {
		courseNavClicked = !courseNavClicked;
	}
</script>

<svelte:window on:resize={handleResize} />

<div class="outer-wrapper">
	<div class="inner-wrapper">
		{#if institutes}
			{#if windowWidth && windowWidth <= 870}
				<nav class="nav2">
					<div class="wrapper">
						<button on:click={toggleRecursiveNav}>Recursive Nav</button>
						{#if recNavClicked}
							<Accordion>
								<RecursiveNav data={institutes} {currentPath} />
							</Accordion>
						{/if}
					</div>
				</nav>
			{:else}
				<nav class="nav2">
					<div class="wrapper">
						<h2>Recursive Nav</h2>
						<RecursiveNav data={institutes} {currentPath} />
					</div>
				</nav>
			{/if}
			{#if isCourse}
				{#if windowWidth && windowWidth <= 870}
					<nav class="nav1">
						<!-- If current path is to a course/module/lesson -->
						<button on:click={toggleCourseNav}>Course Nav</button>
						{#if courseNavClicked}
							<CourseNav data={current} {currentPath} />
						{/if}
					</nav>
				{:else}
					<nav class="nav1">
						<h2>Course Nav</h2>
						<CourseNav data={current} {currentPath} />
					</nav>
				{/if}
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.outer-wrapper {
		grid-area: contentNavs;
		container-type: inline-size;
	}

	.inner-wrapper {
		height: 100%;
	}
	h2 {
		margin: 0;
	}
	.nav1,
	.nav2 {
		& button {
			width: 100%;
		}
	}

	.wrapper {
		margin-bottom: 1.5rem;
	}

	@container (min-width: 300px) {
		.outer-wrapper {
			.inner-wrapper {
				display: flex;
				gap: var(--spacing-m);

				.nav1,
				.nav2 {
					flex: 1 1 auto;

					button {
						padding: 0;
						height: 2rem;
					}
				}

				.wrapper {
					height: 100%;
				}
			}
		}
	}

	@media (max-width: 870px) {
		.inner-wrapper {
			overflow-y: scroll;
		}
	}
</style>

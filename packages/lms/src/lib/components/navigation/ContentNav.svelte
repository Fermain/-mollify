<script lang="ts">
	import { onMount } from 'svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import RecursiveNav from './RecursiveNav.svelte';
	import CourseNav from './CourseNav.svelte';

	let institutes: [] | null = [];
	let current: ContentObject = {};
	let isCourse = false;
	let pathArray: string[];
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
		institutes = $files;
		current = getCurrent(institutes, pathArray);

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
{#if institutes}
	{#if windowWidth && windowWidth < 935}
		<nav class="nav2">
			<div class="wrapper">
				<button on:click={toggleRecursiveNav}>Recursive Nav</button>
				{#if recNavClicked}
					<RecursiveNav data={institutes} {currentPath} />
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
		{#if windowWidth && windowWidth < 935}
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

<style lang="scss">
	h2 {
		margin: 0;
	}
	.nav1 {
		grid-area: nav1;

		& button {
			width: 100%;
		}
	}

	.nav2 {
		grid-area: nav2;

		& button {
			width: 100%;
		}
	}

	.wrapper {
		margin-bottom: 1.5rem;
	}

	@media screen and (max-width: 935px) {
		.nav1 {
			grid-area: 2 / 2 / 3 / 3;

			& button {
				height: 3rem;
			}
		}

		.nav2 {
			grid-area: 2 / 3 / 3 / 4;

			& button {
				height: 3rem;
			}
		}
	}
</style>

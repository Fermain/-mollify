<script lang="ts">
	import { onMount } from 'svelte';
	import RecursiveNav from '../nav/RecursiveNav.svelte';
	import ProgrammeNav from '../nav/ProgrammeNav.svelte';
	import CourseNav from '../nav/CourseNav.svelte';
	import { files } from '$lib/stores/files.ts';

	let institutes: any = {};
	let current: any = {};
	let isCourse: boolean = false;

	onMount(async () => {
		const unsubscribe = files.subscribe((data) => {
			institutes = data;
		});
		current = getCurrent(institutes, pathArray);
		if (
			current.description.type === 'Course' ||
			current.description.type === 'Module' ||
			current.description.type === 'Lesson'
		) {
			isCourse = true;
		}

		console.log(isCourse);
		return () => unsubscribe();
	});

	const path = window.location.pathname.replaceAll(`%20`, ' ');
	const objectPath = path.replace('/content/', '');
	const pathArray = objectPath.split('/');

	/**
	 * Recursively get the current object from the path
	 * @param obj the object to search
	 * @param keys the keys to search for
	 */
	function getCurrent(obj: any, keys: string[]): any {
		if (!obj) {
			return undefined;
		}

		if (keys.length === 0) {
			return obj;
		}

		// If the current object is a course, return it
		if (obj.description?.type === 'Course') {
			return obj;
		}

		const [key, ...rest] = keys;
		return getCurrent(obj[key], rest);
	}
</script>

{#if isCourse}
	<main>
		<div>
			<nav>
				<!-- If current path is to a course/module/lesson -->
				<CourseNav data={current} />

				<!-- <RecursiveNav data={institutes} /> -->
			</nav>
			<section>
				<slot />
			</section>
		</div>
	</main>
{:else if !isCourse && current !== undefined}
	<ProgrammeNav data={current}>
		<slot />
	</ProgrammeNav>
{/if}

<style>
	main {
		padding: 1rem;
	}
	@media (min-width: 768px) {
		div {
			display: grid;
			grid-template-columns: 1fr 3fr;
			gap: 2rem;
		}
	}
</style>

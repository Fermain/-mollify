<script lang="ts">
	import { onMount } from 'svelte';
	import ProgrammeNav from '../nav/ProgrammeNav.svelte';
	import CourseNav from '../nav/CourseNav.svelte';
	import { files } from '$lib/stores/files';
	import { getCurrent } from '$lib/utils/getCurrent';

	let institutes = {};
	let current = {};
	let isCourse = false;

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
</script>

{#if isCourse}
	<!-- If current path is to a course/module/lesson -->
	<main>
		<div>
			<nav>
				<CourseNav data={current} />
			</nav>
			<section>
				<slot />
			</section>
		</div>
	</main>
{:else if !isCourse && current !== undefined}
	<!-- If current path is to an institute or programme -->
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

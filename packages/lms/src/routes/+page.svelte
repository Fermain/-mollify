<script>
	import { onMount } from 'svelte';
	let institutes = {};
	onMount(async () => {
		const response = await fetch('/api/parseMarkdown');
		institutes = await response.json();
		console.log('institutes:', institutes);
	});
</script>

<main>
	<h1>Welcome to Mollify</h1>

	<p>
		Welcome to Mollify, the learning management platform that aims to simplify content creation for
		teachers and enhance the learning experience for students. With Mollify, we understand that
		creating content can be a daunting task, especially for those with minimal technical skills.
		That's why we've designed our platform to be intuitive and easy to use, allowing teachers to
		focus on what matters most - creating engaging and informative lessons for their students. Our
		clean and efficient user interface is designed to provide a seamless experience for teachers,
		giving them access to all the tools they need to create and manage their content in one place.
		And with our AI-powered assistant, Molly, we're taking things to the next level. Molly will be
		able to assist students with questions about lesson content and provide feedback to teachers on
		how to improve their content, making the learning experience more interactive and dynamic. At
		Mollify, we're committed to helping educators create high-quality content that engages and
		inspires their students. With our platform and AI-powered assistant, we're confident that we can
		make learning more accessible and enjoyable for everyone.
	</p>

	<h2>Content From Are Testing Institutes</h2>
	<div class="inst-grid">
		{#each Object.entries(institutes) as [institute, instituteData]}
			<div class="card">
				<h3>{institute}</h3>
				{#if instituteData.description}
					<img src={instituteData.description.url} alt={instituteData.description.name} />
					<p>{instituteData.description.summary}</p>
					<a href={`/content/${institute}`}>View Details</a>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 1rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.card {
		max-width: 300px;
		margin: 1rem;
		padding: 1rem;
		border: 1px solid #ccc;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
		border-radius: 1rem;
	}

	.card img {
		width: 100%;
	}

	.card a {
		display: block;
		text-align: center;
		margin-top: 1rem;
		padding: 0.5rem;
		background-color: #661f86;
		border-radius: 0.5rem;
		text-decoration: none;
		color: white;
		font-size: 1.25rem;
	}
</style>

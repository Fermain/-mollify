<script lang="ts">
	import InkMde from 'ink-mde/svelte';

	let value =
		'Owls are nocturnal birds of prey known for their exceptional night vision and silent flight.';
</script>

<InkMde
	bind:value
	options={{
		interface: {
			appearance: 'light',
			toolbar: true
		},
		readability: true,
		toolbar: {
			bold: true,
			code: true,
			codeBlock: true,
			heading: true,
			image: true,
			italic: true,
			link: true,
			list: true,
			orderedList: true,
			quote: true,
			taskList: true,
			upload: true
		}
	}}
/>

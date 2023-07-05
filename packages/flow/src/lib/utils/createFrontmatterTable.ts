export default function createFrontmatterTable(): HTMLTableElement | null {
	const demo: HTMLElement | null = document.querySelector('#demo');

	if (demo) {
		//Frontmatter is displayed as an h2 in the preview
		//by selecting this element we can convert it into a table
		const h2Elements = demo.getElementsByTagName('h2');

		// Since there may be more h2 in the document, we need to make sure we'll convert the correct one
		// Sveltekit automatically assigns an ID containing every word in the frontmatter
		// we can be sure that the word 'title' will be a part of it
		let childDiv = null;
		for (let i = 0; i < h2Elements.length; i++) {
			if (h2Elements[i].id.includes('title')) {
				childDiv = h2Elements[i];
				break;
			}
		}

		// Create the table if it exists
		if (childDiv) {
			// Extract the title and tags from the element's innerHTML
			const innerHTML = childDiv.innerHTML;
			const tableCell = innerHTML.split('tags:');

			// Create html table
			const table = document.createElement('table');

			// Create rows
			const trHeading = document.createElement('tr');
			const trBody = document.createElement('tr');

			//Table head and its elements
			const tableHead = document.createElement('thead');

			const thTitle = document.createElement('th');
			thTitle.innerHTML = 'Title';
			trHeading.append(thTitle);

			const thTags = document.createElement('th');
			thTags.innerHTML = 'Tags';
			trHeading.append(thTags);

			tableHead.append(trHeading);

			//Table body and its elements
			const tableBody = document.createElement('tbody');

			const tdTitle = document.createElement('td');
			tdTitle.innerHTML = tableCell[0].replace('title: ', ' ');
			trBody.append(tdTitle);

			const tdTags = document.createElement('td');
			tdTags.innerHTML = tableCell[1].replace('-', '');
			trBody.append(tdTags);

			tableBody.append(trBody);

			// Style table
			table.style.border = '1px solid #333';

			tableHead.style.backgroundColor = '#333';
			tableHead.style.color = '#fff';

			tdTitle.style.padding = '0.5rem';
			tdTags.style.padding = '0.5rem';

			table.append(tableHead);
			table.append(tableBody);

			// Hide the h2 with the frontmatter to avoid data repetition
			childDiv.style.display = 'none';

			// Return the frontmatter table
			return table;
		}
	}
	// Return null if there's no frontmatter
	return null;
}

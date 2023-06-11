import { checkForEmoji } from './checkForEmoji';

export function styleCallouts(): void {
	const demo = document.querySelector('#demo');

	if (demo) {
		//Select all blockquotes and add the callout class
		const blockquotes = demo.querySelectorAll('blockquote');
		blockquotes.forEach((blockquote) => {
			blockquote.classList.add('callout');

			//if the blockquotes start with emojis, they're a callout, add the proper classes
			const secondChild = blockquote.childNodes[1] as HTMLElement;
			if (secondChild && checkForEmoji(secondChild.innerHTML)) {
				secondChild.classList.add('callout-title-text');

				//add specific classes to these emojis
				if (secondChild.innerHTML.startsWith('⚠')) {
					blockquote.style.borderLeft = '0.3rem solid #ffff2a';
				} else if (secondChild.innerHTML.startsWith('✅')) {
					blockquote.style.borderLeft = '0.3rem solid #01e701';
				} else if (secondChild.innerHTML.startsWith('⛔')) {
					blockquote.style.borderLeft = '0.3rem solid #ff2c2c';
				}
			}
		});
	}
}

import { toBold } from './toBold';
import { save } from '$lib/utils/storage';

/*Word emphasis is selectively applied to text within paragraphs (<p>) and list items (<li>), while it avoids applying emphasis to headings (<hn>), links (<a>), and code blocks (<code>) to preserve their distinct styling.*/
export function applyWordEmphasis(): void {
  const textContainer = document.querySelector('#content') as HTMLDivElement;

  for (const child of textContainer.children) {
    child.childNodes.forEach((childNode) => {
      if (childNode.parentNode?.nodeName === 'P' && childNode.nodeType === Node.TEXT_NODE) {
        const edited: string[] = [];
        const textNode = childNode as Text;
        const words = textNode.textContent?.split(' ');

        words?.forEach((word: string) => {
          const editedWord = toBold(word);
          edited.push(editedWord);
        });

        const span = document.createElement('span');
        span.classList.add('emphasis-applied');
        span.innerHTML = edited.join(' ');
        textNode.parentNode?.replaceChild(span, textNode);
      } else if (childNode.nodeName === 'LI') {
        const edited: string[] = [];
        const htmlElement = childNode as HTMLElement;
        const words = htmlElement.innerText.split(' ');

        words.forEach((word: string) => {
          const editedWord = toBold(word);
          edited.push(editedWord);
          htmlElement.innerHTML = edited.join(' ');
        });
      }
    });
  }

  save('wordEmphasis', true);
}

import { save } from '$lib/utils/storage';

export function removeWordEmphasis() {
  const textContainer = document.querySelector('#content') as HTMLDivElement;
  const boldElements = Array.from(textContainer.querySelectorAll('b.emphasis-added'));
  boldElements.forEach((element) => {
    const boldText = element.textContent || '';
    const nextTextNode = element.nextSibling;
    const nextText = nextTextNode && nextTextNode.nodeType === Node.TEXT_NODE ? nextTextNode.textContent : '';

    const combinedText = boldText + (nextText || '');
    const newTextNode = document.createTextNode(combinedText);

    element.parentNode?.replaceChild(newTextNode, element);

    if (nextTextNode) {
      nextTextNode.remove();
    }
  });

  const spansAdded = Array.from(textContainer.querySelectorAll('span.emphasis-applied'));
  spansAdded.forEach((element) => {
    const text = element.textContent;

    if (text) {
      const newTextNode = document.createTextNode(text);
      element.parentNode?.replaceChild(newTextNode, element);
    }
  });

  textContainer.normalize();
  save('wordEmphasis', false);
}

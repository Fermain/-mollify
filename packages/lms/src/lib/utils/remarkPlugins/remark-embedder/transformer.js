import { visit } from 'unist-util-visit';

function transformer(ast) {
  visit(ast, 'image', visitor);

  function visitor(node) {
    const data = node.data || (node.data = {});
    let src = node.url;
    const alt = node.alt;

    // escape hatch into video component

    let newNode = null;
    if (node.url.includes('https://player.vimeo.com' || 'https://www.youtube.com')) {
      const newNode = {
        type: 'html',
        value: `<iframe src="${src}" style="aspect-ratio: 16 / 9; width: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      };
      return Object.assign(node, newNode);
    } else {
      newNode = {
        type: 'html',
        value: `<img src=${src} alt="${alt}" />`
      };
    }
  }
}

export default transformer;

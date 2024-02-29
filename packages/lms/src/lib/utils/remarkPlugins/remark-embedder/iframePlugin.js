import { visit } from 'unist-util-visit';

function iframePlugin() {
  return (tree) => {
    visit(tree, 'link', (node, index, parent) => {
      // Correctly handle possible undefined index
      index = index ?? 0;
      const prevIndex = index > 0 ? index - 1 : null;
      const prevNode = typeof prevIndex === 'number' ? parent.children[prevIndex] : null;

      console.log(prevNode);

      if (prevNode && prevNode.type === 'text' && /@/.test(prevNode.value)) {
        const url = node.url;
        const title = node.children[0]?.value || 'Embedded content';

        const iframeNode = {
          type: 'html',
          value: `<iframe src="${url}" title="${title}" style="aspect-ratio: 16 / 9; width: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
        };
        
        const linkNode = {
          type: 'html',
          value: `<a href="${url}" target="_blank" rel="noopener noreferrer">Open in new tab</a>`
        };

        parent.children.splice(prevIndex, 2, iframeNode, linkNode);
      }
    });
  };
}

export default iframePlugin;

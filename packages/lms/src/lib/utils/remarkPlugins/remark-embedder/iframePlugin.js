import { visit } from 'unist-util-visit';

function iframePlugin() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (node.type === 'text' && node.value === '@') {
        // Getting node value
        const nodeValue = node.value;

        // Finding link in child
        const linkObject = parent.children.find((child) => child.type === 'link');

        if (nodeValue === '@' && linkObject) {
          // console.log('NodeValue: ', nodeValue);

          // Setting the url
          const url = parent.children[1].url;
          // console.log('Url:', url);

          node.type = 'html';
          node.value = `<iframe src="${url}" style="aspect-ratio: 16 / 9; width: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
      }
    });
  };
}

export default iframePlugin;

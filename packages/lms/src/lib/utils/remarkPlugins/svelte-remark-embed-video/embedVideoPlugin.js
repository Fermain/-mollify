// Import required packages
import { visit } from 'unist-util-visit';

export default function embedVideoPlugin() {
  return function (tree) {
    visit(tree, 'text', (node, index, parent) => {
      if (parent.type === 'paragraph') {
        if (parent.type === 'paragraph' && parent.children.value === '@(') {
          return;
        }
      }
    });
  };
}

// const regEx = /@\((.*?)\)/g;
// const match = node.value.match(regEx);
// if (match) {
// // Replace the matched text with a new node for the iframe
// const iframeSrc = match[1];
// const iframeNode = {
//   type: 'html',
//   value: `<iframe src="${iframeSrc}"></iframe>`
// };

// parent.children.splice(index, 1, iframeNode);

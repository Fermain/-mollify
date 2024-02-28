import { visit } from 'unist-util-visit';

function generateIframeCode(videoLink) {
  return `<iframe src="${videoLink}" style="aspect-ratio: 16 / 9; width: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
}

function iframePlugin() {
  return function transformer(tree) {
    visit(tree, 'link', function (node) {
      if (node.type === 'link') {
        console.log('Node', node);
        if (node.children.value === '@Video') {
          console.log('Child Node', node.children);
        }
      }

      if (
        node.children.length === 1 &&
        node.children[0].type === 'text' && // Check if the child node is text
        (node.url.startsWith('https://player.vimeo.com') || // Check if the URL starts with Vimeo
          node.url.startsWith('https://www.youtube.com')) // Check if the URL starts with YouTube
      ) {
        const videoLink = node.url; // Get the video link

        // Generate the HTML iframe code
        const iframeCode = generateIframeCode(videoLink);

        // Replace the link node with the HTML iframe node
        node.type = 'html';
        node.value = iframeCode;
      }
    });
  };
}

export default iframePlugin;



import { visit } from 'unist-util-visit';
import getVimeoLink from './getVimeoLink.js';

const transformers = [getVimeoLink];

module.exports = async ({ markdownAST }) => {
  const transformations = [];
  visit(markdownAST, 'text', (node) => {
    const { value } = node;
    transformers.forEach((transformer) => {
      if (transformer.shouldTransform(value)) {
        transformations.push(async () => {
          const html = await transformer(value);
          node.type = 'html';
          node.value = html;
        });
      }
    });
  });

  const promises = transformations.map((t) => t());
  await Promise.all(promises);

  return markdownAST;
};

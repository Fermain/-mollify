import { visit } from 'unist-util-visit';

function generateIframeCode(videoLink) {
  return `<iframe src="${videoLink}" style="aspect-ratio: 16 / 9; width: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
}

function iframePlugin() {
  return function transformer(tree) {
    visit(tree, 'link', function (node) {
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

    // Remove paragraph nodes that only contain iframes
    visit(tree, 'paragraph', function (node, index, parent) {
      if (
        node.children.length === 1 &&
        node.children[0].type === 'html' &&
        node.children[0].value.startsWith('<iframe')
      ) {
        parent.children[index] = node.children[0]; // Replace paragraph with iframe
      }
    });
  };
}

export default iframePlugin;

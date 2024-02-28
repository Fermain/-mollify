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
          // Setting the url
          // console.log('NodeValue: ', nodeValue);
          const url = parent.children[1].url;
          // console.log('Url:', url);

          if (parent.children[1].url.startsWith('https://www.youtube.com')) {
            // Create a URL object
            const videoId = new URL(url);

            // Get the value of the 'v' parameter
            const youtubeId = videoId.searchParams.get('v');

            // Setting youtube url as embed video
            const youtubeVideoUrl = `https://www.youtube.com/embed/${youtubeId}`;

            // Returning html if youtube video
            node.type = 'html';
            node.value = `<iframe src="${youtubeVideoUrl}" style="aspect-ratio: 16 / 9; width: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
          } else {
            // Returning html if not youtube video
            node.type = 'html';
            node.value = `<iframe src="${url}" style="aspect-ratio: 16 / 9; width: 100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
          }
        }
      }
    });
  };
}

export default iframePlugin;

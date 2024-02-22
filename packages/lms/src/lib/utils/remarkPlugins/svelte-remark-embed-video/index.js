import { fromMarkdown } from 'mdast-util-from-markdown';
import { visit } from 'unist-util-visit';

const markdownContent = fromMarkdown(
  `Here are some videos: 
  
  @[Video 1](https://example-video1.com)
  
  @[Video 2](https://example-video2.com)
  
  `
);

export const embedVideo = () => {
  return (tree) => {
    visit(tree, 'link', (node) => {
      if (node.type === 'link') {
        console.log('Node console', node);

        // Getting the title and link
        let title = node.children[0].value;
        let src = node.url;

        // Setting the html
        node.type = 'html';
        node.value = '<iframe src="' + src + '" title="' + title + '" />';
        delete node.children;

        console.log(node.value);
      }
    });
  };
};


visit(markdownContent, 'link', function (node, index, parent) {
  if (node.type === 'link') {
    console.log('Node console', node);

    // Getting the title and link
    let title = node.children[0].value;
    let src = node.url;

    // Setting the html
    node.type = 'html';
    node.value = '<iframe src="' + src + '" title="' + title + '" />';
    delete node.children;

    console.log(node.value);
  }
});
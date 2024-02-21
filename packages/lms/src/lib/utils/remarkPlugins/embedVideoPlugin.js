// Import required packages
import { remark } from 'remark';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';



const markdownContent =
  'Here are some videos: @[Video 1](https://example-video1.com) and @[Video 2](https://example-video2.com)';

export default function embedVideoPlugin() {
  let videoLinkExists = false;

  return function (tree) {
    tree.children.forEach(function (node) {
      if (node.type === "link" && node.startsWith('@')) {
        videoLinkExists = true
        let title = node.children[0].value;
        let src = node.children[1].value;

        node.type = 'html';
        node.value = '<iframe src="' + src + '" title="' + title + '" />';
        delete node.children;
      }
    });
  };
}

let processor = unified()
.use(remarkParse)
.use(embedVideoPlugin)
.use(remarkStringify);


processor.process(markdownContent, function (err, file) {
  if (err) {
    console.error('Error processing Markdown:', err);
    return;
  }
  console.log(String(file));
});

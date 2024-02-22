// Import required packages
import { remark } from 'remark';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';

export default function embedVideoPlugin() {
  return function (tree) {
    visit(tree, 'link', (node) => {
      
      // Regular expression to match links in the format @[url](title)
      const linkRegex = /\@\[(.*?)\]\((.*?)\)/;

      // Check if the title and URL match the expected pattern
      if (node.title && node.url && node.title.match(linkRegex) && node.url.match(linkRegex)) {
        const urlMatch = node.url.match(linkRegex);
        const titleMatch = node.title.match(linkRegex);

        // Extract URL and title
        const url = urlMatch[2];
        const title = titleMatch[2];

        // Handle the link with @ symbol
        console.log('Link with @ found:');
        console.log('URL:', url);
        console.log('Title:', title);
      }
    });
  };
}


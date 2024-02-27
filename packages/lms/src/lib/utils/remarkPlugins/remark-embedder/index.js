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

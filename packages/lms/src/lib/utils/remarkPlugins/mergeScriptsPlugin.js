import { visit } from 'unist-util-visit';
// this is needed because svelte only accepts a single script, and mdsvex only expects one scripts from a single markdown document.

export default function mergeScripts() {
  const scripts = [];

  // walk the tree
  return (tree) => {
    visit(tree, 'html', (node) => {
      if (!node.value.startsWith('<script>')) return;

      let currentScript = node.value.replace('<script>', '').replace('</script>', '');
      if (scripts.includes(currentScript)) {
        node.type = 'text';
        node.value = '';
        return; // skip duplicates
      }
      scripts.push(currentScript);

      // Remove the original 'html' node from the tree
      node.type = 'text';
      node.value = '';
    });

    // Create a new 'html' node with the merged script content
    if (scripts.length > 0) {
      tree.children.push({
        type: 'html',
        value: `<script>${scripts.join(';\n')}</script>`
      });
    }
  };
}

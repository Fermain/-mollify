import { visit } from 'unist-util-visit';

export default function codeBlockPlugin() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      node.type = 'jsx';
      node.value = `<CodeBlock language="${node.lang}" code={\`${node.value}\`} buttonLabel="Copy" lineNumbers={true}/>`;
    });
  };
}

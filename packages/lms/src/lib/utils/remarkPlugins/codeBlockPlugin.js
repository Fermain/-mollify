import { visit } from 'unist-util-visit';

export default function codeBlockPlugin() {
  let codeBlockExists = false;
  return (tree) => {
    visit(tree, 'code', (node) => {
      codeBlockExists = true;
      node.type = 'html';
      node.value = `
			<Components.CodeBlock 
				class="my-2" 
				language="${node.lang}" 
				code={${JSON.stringify(node.value)}} 
				buttonLabel="Copy" 
				lineNumbers={true}
			/>`;
    });
  };
}

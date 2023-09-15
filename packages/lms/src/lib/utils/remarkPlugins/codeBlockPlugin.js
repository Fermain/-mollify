import { visit } from 'unist-util-visit';

const importString = "import {CodeBlock} from '@skeletonlabs/skeleton'";

export default function codeBlockPlugin() {
  let codeBlockExists = false;
  return (tree) => {
    visit(tree, 'code', (node) => {
      codeBlockExists = true;
      node.type = 'html';
      node.value = `
			<CodeBlock 
				class="my-2" 
				language="${node.lang}" 
				code={${JSON.stringify(node.value)}} 
				buttonLabel="Copy" 
				lineNumbers={true}
			/>`;
    });

    if (codeBlockExists) {
      visit(tree, 'root', (node) => {
        node.children.push({
          type: 'html',
          value: `<script> ${importString} </script>`
        });
      });
    }
  };
}

export function createTask(editor) {
	const cm = editor.codemirror;
	let output = '';
	const selectedText = cm.getSelection();
	const text = selectedText;

	output = `[] ${text}`;
	cm.replaceSelection(output);

	/* 	console.log(cm);

	const coords = cm.cursorCoords();
	console.log(coords);

	const cursor = cm.getCursor();
	console.log(cursor); */
}

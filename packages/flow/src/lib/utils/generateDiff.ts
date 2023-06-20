import * as Diff from 'diff';
import * as Diff2Html from 'diff2html';

export function generateDiff(oldText: string, value: string): string {
	const textDiff = Diff.createTwoFilesPatch('file', 'file', oldText, value);

	const diffJson = Diff2Html.parse(textDiff);
	const generatedDiff = Diff2Html.html(diffJson, {
		drawFileList: true,
		matching: 'lines',
		outputFormat: 'side-by-side'
	});

	return generatedDiff;
}

<script lang="ts">
	import * as Diff2Html from 'diff2html';
	import 'diff2html/bundles/css/diff2html.min.css';

	// An example of a pull request diff using Unified Diff format
	const change = `--- file.txt
+++ file.txt
@@ -1,3 +1,3 @@
 Owls are nocturnal birds of prey known for their exceptional night vision and silent flight.
-They are found on every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons.
+They inhabit every continent except Antarctica and are characterized by their large, forward-facing eyes, flat faces, and powerful talons.
 Owls belong to the order Strigiformes and are divided into two distinct families: Tytonidae (barn owls) and Strigidae (true owls).
`;

	$: output = Diff2Html.html(change, {
		drawFileList: true,
		matching: 'lines',
		outputFormat: 'side-by-side'
	});
</script>

<div class="demo pull-request">
	{@html output}
</div>

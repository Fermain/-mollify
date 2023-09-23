import type { EntityMeta } from "@mollify/types";
import * as storage from "../storage";

export default async function progressLog() {
	const response = await fetch('/api/getEntityMetaTree');
	const tree = await response.json()

	const savedHierarchyMap = JSON.parse(window.sessionStorage.getItem("hierarchyMap") as string)
	const hierarchyMap = new Map(savedHierarchyMap);

	if (!hierarchyMap || hierarchyMap.size === 0) buildHierarchyMap(tree)

	let contentMap = new Map(storage.load("contentCompletionMap"))
	if (!contentMap || contentMap.size === 0) contentMap = buildContentCompletionMap(hierarchyMap)

	function buildHierarchyMap(nodes: EntityMeta[], parentAddress: string | null = null) {
		nodes.forEach(node => {
			hierarchyMap.set(
				node.browserPath,
				{
					parentAddress,
					children: node.children.map(child => child.browserPath) ?? []
				}
			)

			if (node.children.length > 0) buildHierarchyMap(node.children, node.browserPath)
		})

		window.sessionStorage.setItem("hierarchyMap", JSON.stringify([...hierarchyMap]))
	}

	function buildContentCompletionMap(hierarchyMap) {
		for (const [browserPath] of hierarchyMap)
			contentMap.set(browserPath, false)
		storage.save("contentCompletionMap", [...contentMap])
		return contentMap;
	}
}


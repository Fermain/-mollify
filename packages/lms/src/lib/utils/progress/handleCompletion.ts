import { load, save } from "../storage";

type MapValue = {
	children: string[],
	parentAddress: string
}

export default function handleCompletion(address: string) {
	const hierarchyMap: Map<string, MapValue> = new Map(JSON.parse(sessionStorage.getItem("hierarchyMap") || ""))
	const completionMap: Map<string, boolean> = new Map(load('contentCompletionMap'));
	const parentMap = hierarchyMap.get(address)

	if (!parentMap) return

	if (parentMap.children.length > 0) {
		const allChildrenCompleted = parentMap.children.every(child => completionMap.get(child))
		if (allChildrenCompleted) {
			completionMap.set(address, true)
			handleCompletion(parentMap.parentAddress)
		}
	} else {
		completionMap.set(address, true)
	}
	save('contentCompletionMap', [...completionMap])
};


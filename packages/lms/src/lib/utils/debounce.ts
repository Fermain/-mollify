export default function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
	let timer: NodeJS.Timeout

	return function (...args: Parameters<T>) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, delay);
	};
}
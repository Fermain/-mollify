import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-bright.css'; // themeselection https://github.com/highlightjs/highlight.js/blob/main/src/styles/tomorrow-night-blue.css
import { storeHighlightJs } from '@skeletonlabs/skeleton';

storeHighlightJs.set(hljs);

export default hljs;

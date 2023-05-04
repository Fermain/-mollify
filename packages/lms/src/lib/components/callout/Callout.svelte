<!--
  Readme callouts syntax
  Must start with a icon to determind what theme of callout it is
  Exampel: 

> 👍 Success
> 
> Vitae reprehenderit at aliquid error voluptates eum dignissimos.

  Callout component
  @prop {string} icon - Icon of callout to determind what theme of callout it is
  @prop {string} title - Title of callout
  @prop {string} description - Description of callout
  @slot - Content of callout

  Customize: 

.markdown-body .callout.callout_default {}  /* gray */
.markdown-body .callout.callout_info {}     /* blue */
.markdown-body .callout.callout_okay {}     /* green */
.markdown-body .callout.callout_warn {}     /* orange */
.markdown-body .callout.callout_error {}    /* red */

css: 
.markdown-body .callout.callout_warn {
  --text: #6a737d;  // theme text color default
  --title: inherit; // theme title color (falls back to text color by default)
  --background: #f8f8f9;
  --border: #8b939c;
}
-->
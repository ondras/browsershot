# Browsershot

Taking screenshots programatically, using the [getDisplayMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia) API. Useful for debugging, feedback etc.

## Example

```js
let bs = await import("https://unpkg.com/browsershot/index.js");
try {
	let canvas = await bs.toCanvas();
	document.body.appendChild(canvas);
} catch (e) {
	alert(e.message);
}
```

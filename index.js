const options = {
	video: {
		cursor: "never",
		displaySurface: "browser"
	}
}

function draw(video) {
	let canvas = document.createElement("canvas");
	video.width = canvas.width = video.videoWidth;
	video.height = canvas.height = video.videoHeight;
	canvas.getContext("2d").drawImage(video, 0, 0);

	video.srcObject.getTracks().forEach(track => track.stop());
	video.srcObject = null;
	
	return canvas;
}

export async function toCanvas() {
	let stream = await navigator.mediaDevices.getDisplayMedia(options);
	let video = document.createElement("video");
	video.srcObject = stream;
	video.play();
	
	return new Promise(resolve => {
		video.addEventListener("canplay", e => {
			let canvas = draw(video);
			resolve(canvas);
		}, {once:true});
	});
}

export async function toDataURL(...args) {
	let canvas = await toCanvas();
	return canvas.toDataURL(...args);
}

export async function toBlob(...args) {
	let canvas = await toCanvas();
	return new Promise(resolve => canvas.toBlob(resolve, ...args));
}

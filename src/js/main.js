//Video resize VanillaJS version
const body = document.querySelector('body');

var iframeElement = document.getElementsByClassName('iframe');

for (let iframe of iframeElement) {
	const iframeWidth = parseFloat(iframe.getAttribute('width'));
	const iframeHeight = parseFloat(iframe.getAttribute('height'));

	iframe.dataset.aspectRatio = (iframeHeight / iframeWidth).toString();

	iframe.removeAttribute('width');
	iframe.removeAttribute('height');
}

const resizeIFrame = () => {
	let newWidth = body.clientWidth;

	for (let iframe of iframeElement) {
		iframe.setAttribute('width', newWidth.toString());
		iframe.setAttribute('height', (newWidth * iframe.dataset.aspectRatio).toString());
	}
};

document.addEventListener('DOMContentLoaded', resizeIFrame);
window.addEventListener('resize', resizeIFrame);

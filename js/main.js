//Init icons
// @ts-ignore
feather.replace();

//Init carousel
// @ts-ignore
$('.carousel').carousel({
	touch: true,
	interval: 3000,
});

//Video resize JQuery version
/* var iframeVideos = $('.iframe-video');
var videoWrapper = $('body');

iframeVideos.each(function () {
	$(this)
		.data('aspectRatio', this.height / this.width)

		.removeAttr('height')
		.removeAttr('width');
});

$(window)
	.resize(function () {
		var newWidth = videoWrapper.width();

		iframeVideos.each(function () {
			var el = $(this);
			console.log(el);
			el.width(newWidth).height(newWidth * el.data('aspectRatio'));
		});
	})
	.resize();
 */

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

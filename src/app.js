// IMAGES
import './images/logo.png';
import './images/credits.jpg';
import './images/investing.jpg';
import './images/loan.jpg';
import './images/loc.png';
import './images/card.jpg';
import './images/us.jpg';
import './images/presentation-card.jpg';

//CSS
import './scss/styles.scss';



//Init icons
// @ts-ignore
feather.replace();

//Init carousel
// @ts-ignore
$('.carousel').carousel({
	touch: true,
	interval: 5000,
});

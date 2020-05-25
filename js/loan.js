//Elements
const loanFormHTML = document.getElementById('loan-form');
const loanForm = document.forms['loanForm'];
const loanResult = document.getElementById('loanResult');
const paymentHTML = document.querySelector('span.payment');
const totalHTML = document.querySelector('span.total');
const minHTML = document.querySelector('span.min');
const maxHTML = document.querySelector('span.max');
const loanErrorHTML = document.getElementById('loanError');
const moneyFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/************************** Listeners ***************************/

// Input number
loanForm.amount.addEventListener('keydown', (e) => {
	const numberKey = /\d+/;
	const otherKey = /(back)/i;
	if (!(numberKey.test(e.key) || otherKey.test(e.key))) {
		e.preventDefault();
	}
});

loanFormHTML.addEventListener('submit', (e) => {
	e.preventDefault();
	let amount = parseFloat(loanForm.amount.value);
	let { max, min, rate } = getLoanType(loanForm.loanType.value);
	let months = parseInt(loanForm.month.value);

	if (amount <= max && amount >= min) {
		let payment = calculate(amount, months, rate);
		showLoan(payment, amount);
	} else {
		showLoanError(min, max);
	}
});

function getLoanType(type) {
	let loanType = {};
	loanType.personal = {
		max: 100000,
		min: 10000,
		rate: 2.45,
	};
	loanType.car = {
		max: 500000,
		min: 10000,
		rate: 3.12,
	};
	loanType.creditLine = {
		max: 1000000,
		min: 10000,
		rate: 3.9,
	};
	return loanType[type];
}

const calculate = (amount, months, rate) => {
	let total = amount,
		payment,
		interest = 0;

	payment = amount / months;

	for (let i = 0; i <= months; i++) {
		amount = payment * i;
		interest += (amount * rate) / 12 / 100;
	}

	total = Math.ceil(total + interest);
	payment = Math.ceil(total / months);

	return payment;
};

const showLoan = (payment, amount) => {
	paymentHTML.textContent = moneyFormat.format(payment);
	totalHTML.textContent = moneyFormat.format(amount);
	if (!loanErrorHTML.classList.contains('hidden')) {
		loanErrorHTML.classList.add('hidden');
	}
};

const showLoanError = (min, max) => {
	if (loanErrorHTML.classList.contains('hidden')) {
		loanErrorHTML.classList.remove('hidden');
	}
	minHTML.textContent = moneyFormat.format(min);
	maxHTML.textContent = moneyFormat.format(max);
	paymentHTML.textContent = '$0';
	totalHTML.textContent = '$0';
};

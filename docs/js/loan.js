/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/loan.js ***!
  \************************/
//Elements
var loanFormHTML = document.getElementById('loan-form');
var loanForm = document.forms['loanForm'];
var loanResult = document.getElementById('loanResult');
var paymentHTML = document.querySelector('span.payment');
var totalHTML = document.querySelector('span.total');
var minHTML = document.querySelector('span.min');
var maxHTML = document.querySelector('span.max');
var loanErrorHTML = document.getElementById('loanError');
var moneyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
/************************** Listeners ***************************/
// Input number

loanForm.amount.addEventListener('keydown', function (e) {
  var numberKey = /\d+/;
  var otherKey = /(back)/i;

  if (!(numberKey.test(e.key) || otherKey.test(e.key))) {
    e.preventDefault();
  }
});
loanFormHTML.addEventListener('submit', function (e) {
  e.preventDefault();
  var amount = parseFloat(loanForm.amount.value);

  var _getLoanType = getLoanType(loanForm.loanType.value),
      max = _getLoanType.max,
      min = _getLoanType.min,
      rate = _getLoanType.rate;

  var months = parseInt(loanForm.month.value);

  if (amount <= max && amount >= min) {
    var payment = calculate(amount, months, rate);
    showLoan(payment, amount);
  } else {
    showLoanError(min, max);
  }
});

function getLoanType(type) {
  var loanType = {};
  loanType.personal = {
    max: 100000,
    min: 10000,
    rate: 2.45
  };
  loanType.car = {
    max: 500000,
    min: 10000,
    rate: 3.12
  };
  loanType.creditLine = {
    max: 1000000,
    min: 10000,
    rate: 3.9
  };
  return loanType[type];
}

var calculate = function calculate(amount, months, rate) {
  var total = amount,
      payment,
      interest = 0;
  payment = amount / months;

  for (var i = 0; i <= months; i++) {
    amount = payment * i;
    interest += amount * rate / 12 / 100;
  }

  total = Math.ceil(total + interest);
  payment = Math.ceil(total / months);
  return payment;
};

var showLoan = function showLoan(payment, amount) {
  paymentHTML.textContent = moneyFormat.format(payment);
  totalHTML.textContent = moneyFormat.format(amount);

  if (!loanErrorHTML.classList.contains('hidden')) {
    loanErrorHTML.classList.add('hidden');
  }
};

var showLoanError = function showLoanError(min, max) {
  if (loanErrorHTML.classList.contains('hidden')) {
    loanErrorHTML.classList.remove('hidden');
  }

  minHTML.textContent = moneyFormat.format(min);
  maxHTML.textContent = moneyFormat.format(max);
  paymentHTML.textContent = '$0';
  totalHTML.textContent = '$0';
};
/******/ })()
;
//# sourceMappingURL=loan.js.map
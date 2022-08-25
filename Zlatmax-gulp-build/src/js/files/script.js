// Подключение функционала "Чертогов Фрилансера"
// import { isMobile } from "./functions.js";
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

document.addEventListener("DOMContentLoaded", function () {
	let phoneInputs = document.querySelectorAll('input[data-tel-input]');

	let getInpuNumbersValue = function (input) {
		return input.value.replace(/\D/g, "")
	}
	let onPhoneInput = function (e) {
		let input = e.target;
		let inputNumbersValue = getInpuNumbersValue(input),
			formattedInputValue = "",
			selectionStart = input.selectionStart;

		if (!inputNumbersValue) {
			return input.value = "";
		}

		if (input.value.length != selectionStart) {
			if (e.data && /\D/g.test(e.data)) {
				input.value = inputNumbersValue;
			}
			return;
		}

		if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
			//Russian phone number
			if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
			let firstSybmols = (inputNumbersValue[0] == "8") ? "8" : "+7";
			formattedInputValue = firstSybmols + " ";
			if (inputNumbersValue.length > 1) {
				formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
			}
		} else {
			//Not Russian phone number
			formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
		}
		input.value = formattedInputValue;
	};
	let onPhoneKeyDown = function (e) {
		let input = e.target;
		if (e.keyCode == 8 && getInpuNumbersValue(input).length == 1) {
			input.value = "";
		}
	}
	let onPhonePaste = function (e) {
		let pastedText = e.clipboardData || window.clipboardData,
			input = e.target,
			inputNumbersValue = getInpuNumbersValue(input);

		if (pasted) {
			let pastedText = pasted.getData("Text");
			if (/\D/g.test(pastedText)) {
				input.value = inputNumbersValue;
			}
		}
	}
	for (let i = 0; i < phoneInputs.length; i++) {
		let input = phoneInputs[i];
		input.addEventListener("input", onPhoneInput);
		input.addEventListener("keydown", onPhoneKeyDown);
		input.addEventListener("paste", onPhonePaste);
	};





});

document.addEventListener("click", documentActions);

const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block');
if (menuBlocks.length) {
	menuBlocks.forEach(menuBlock => {
		const menuBlockItems = menuBlock.querySelectorAll('.sub-menu-catalog__category').length;
		menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
	});
}

function documentActions(e) {
	const targetElement = e.target;
	if (targetElement.closest('[data-parent]')) {
		const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
		const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
		if (subMenu) {
			const activeLink = document.querySelector('._sub-menu-active');
			const activeBlock = document.querySelector('._sub-menu-open');

			if (activeLink && activeLink !== targetElement) {
				activeLink.classList.remove('_sub-menu-active');
				activeBlock.classList.remove('_sub-menu-open');
				document.documentElement.classList.remove('sub-menu-open');
			}
			document.documentElement.classList.toggle('sub-menu-open');
			targetElement.classList.toggle('_sub-menu-active');
			subMenu.classList.toggle('_sub-menu-open');
		} else {
			console.log('Ой ой,нет такого подменю :(');
		}

		e.preventDefault();
	}
	if (targetElement.closest('.menu-top-header__link_catalog')) {
		document.documentElement.classList.add('catalog-open');
		e.preventDefault();
	}
	if (targetElement.closest('.menu-catalog__back')) {
		document.documentElement.classList.remove('catalog-open');
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;

		e.preventDefault();
	}
	if (targetElement.closest('.sub-menu-catalog__back')) {
		document.documentElement.classList.remove('sub-menu-open');
		document.querySelector('._sub-menu-active') ? document.querySelector('._sub-menu-active').classList.remove('_sub-menu-active') : null;
		document.querySelector('._sub-menu-open') ? document.querySelector('._sub-menu-open').classList.remove('_sub-menu-open') : null;

		e.preventDefault();
	}
	if (targetElement.closest('.select__option')) {
		console.log(targetElement)
		const optionParent = targetElement.closest('.select__body');
		const selectValue = optionParent.querySelector('.select__value');
		const selectContent = optionParent.querySelector('.select__content');
		if (selectContent.length != 0) {
			selectValue.classList.remove('_select-pseudo-label');
			console.log("Класс Удалён успешно!");
		} else {
			console.log("Класса не существует и контент полон!")
		}
	}
}


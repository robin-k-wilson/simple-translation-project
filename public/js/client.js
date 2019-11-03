// components.js
//
// Front-end helper functions for API calls, registering A-Frame components and generating language dropdowns.

// constant variables
const LANGUAGES = {
	english: {
		dropDownText: "English",
		acronym: "en"
	},
	chinese: {
		// simplified Chinese
		dropDownText: "Chinese (simplified)",
		acronym: "zh-CN"
	},
	french: {
		dropDownText: "French",
		acronym: "fr"
	},
	spanish: {
		dropDownText: "Spanish",
		acronym: "es"
	},
	italian: {
		dropDownText: "Italian",
		acronym: "it"
	},
	german: {
		dropDownText: "German",
		acronym: "de"
	},
	japanese: {
		dropDownText: "Japanese",
		acronym: "ja"
	}
};

// dynamic variables w/ default values
let startLanguage = "english";
let targetLanguage = "italian";

AFRAME.registerComponent("translatable", {
	init: function () {
		const el = this.el;
		el.addEventListener("click", ev => {
			const englishWord = el.getAttribute("englishword");
			// if element has a specific placement for the translation, make sure to add that to the attributes and add that to the inner html

			// potential race condition between the two languages
			// TODO make DRY, add Promise.all
			if (startLanguage === "english") {
				// already translated, simply set the english word
				let startLanguageTextElem = document.getElementById("startLanguageText");
				startLanguageTextElem.innerHTML = englishWord;
				setRemoveTranslatedWordsInterval();
			} else {
				$.get(
					`/translate/${LANGUAGES[startLanguage].acronym}/${englishWord}`,
					function (data, status) {
						let startLanguageTextElem = document.getElementById("startLanguageText");
						startLanguageTextElem.innerHTML = data;
						setRemoveTranslatedWordsInterval();
					}
				);
			}

			if (targetLanguage === "english") {
				// already translated, simply set the english word
				let translateTextElem = document.getElementById("translatedText");
				translateTextElem.innerHTML = englishWord;
				setRemoveTranslatedWordsInterval();
			} else {
				$.get(
					`/translate/${LANGUAGES[targetLanguage].acronym}/${englishWord}`,
					function (data, status) {
						let translateTextElem = document.getElementById("translatedText");
						translateTextElem.innerHTML = data;
						setRemoveTranslatedWordsInterval();
					}
				);
			}
		});
	}
});


let removeTranslatedWordsInterval = null; // used with removing the translated text from the screen

// resets timeout for removing the translated words from the screen back to 3 seconds
const TIMEOUT_LENGTH = 3000;
function setRemoveTranslatedWordsInterval() {
	if (removeTranslatedWordsInterval) {
		clearTimeout(removeTranslatedWordsInterval);
	}
	removeTranslatedWordsInterval = setTimeout(
		removeTranslatedWordsFromScreen,
		TIMEOUT_LENGTH
	);
}

// removes the translated words from the screen
function removeTranslatedWordsFromScreen() {
	let translateTextElem = document.getElementById("translatedText");
	let startLanguageTextElem = document.getElementById("startLanguageText");
	translateTextElem.innerHTML = "";
	startLanguageTextElem.innerHTML = "";

	removeTranslatedWordsInterval = null;
}

// creates options for the language dropdowns using the LANGUAGES object
function createLanguageSelectionDropdowns() {
	var dropDownStartLanguage = document.getElementById("startLanguage");
	var dropDownTargetLanguage = document.getElementById("targetLanguage");

	var languageList = Object.keys(LANGUAGES);
	var options = "";
	for (var i = 0; i < languageList.length; i++) {
		let currentLanguage = languageList[i];
		options += `<option value="${currentLanguage}">${LANGUAGES[currentLanguage].dropDownText}</option>`;
	}

	dropDownStartLanguage.innerHTML = options;
	dropDownTargetLanguage.innerHTML = options;

	// set defaults
	dropDownStartLanguage.value = startLanguage;
	dropDownTargetLanguage.value = targetLanguage;

	// set onchange event to change the start and target LANGUAGES
	dropDownStartLanguage.onchange = function () {
		startLanguage = this.value;
	};
	dropDownTargetLanguage.onchange = function () {
		targetLanguage = this.value;
	};
}

function init() {
	document.addEventListener("DOMContentLoaded", () => {
		createLanguageSelectionDropdowns();
		const instructionsElem = document.getElementById("instructions");
		instructionsElem.classList.add("visible");
		setTimeout(function () {
			instructionsElem.classList.remove("visible");
			instructionsElem.classList.add("hidden");
		}, 3500);
	});
}

init();

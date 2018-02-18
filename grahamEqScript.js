


// calling out all the input boxes
var equityNumBox = document.querySelector('#equityNumBox');
var salaryNumBox = document.querySelector('#salaryNumBox');
var valueNumBox = document.querySelector('#valueNumBox');
var vMultiplierBox = document.querySelector('#vMultiplierBox');
var salaryMultiplierBox = document.querySelector('#salaryMultiplierBox');
var companyProfitBox = document.querySelector('#companyProfitBox');

var salaryMultiplierBoxGroup = document.querySelector('#salaryMultiplierBoxGroup');


// calling out the radio buttons
var equityRadio = document.querySelector('#equityRadio');
var salaryRadio = document.querySelector('#salaryRadio');
var valueRadio = document.querySelector('#valueRadio');
var vMultiplierRadio = document.querySelector('#vMultiplierRadio');

// calling out the calculate and reset-to-default buttons
var calculateButton = document.querySelector('#calculateButton');
var resetToDefaultLink = document.querySelector('#resetToDefaultLink');





// This function causes an element to "pulse," and is used when the javascript fills in valus (after calculating or resetting parameters to defaults)
function pulseElement(elementToBePulsed) {
	elementToBePulsed.classList.add('pulse');
	setTimeout(
		function() {
			elementToBePulsed.classList.remove('pulse');
		}, 2000);
}




// This function fills in the "Advanced Parameters" input boxes with default values.  It is called at pageload and when the "reset to defaults" link is clicked.
function setAdvancedParametersToDefaults() {
	salaryMultiplierBox.value = '1.5';
	pulseElement(salaryMultiplierBoxGroup);

	// companyProfitBox.value = '50';
	// pulseElement(companyProfitBox);
}

// Sets "Advanced Parameters" to default on pageload
setAdvancedParametersToDefaults();

resetToDefaultLink.addEventListener("click", setAdvancedParametersToDefaults);





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

	elementToBePulsed.classList.add('pulseOn'); // This adds a green background to the box

	// After waiting a beat (100ms chosen arbitrarily) we add a class that causes all changes to the element to be animated, and then we remove the 'pulseOn' class, so that the border background to fade away.
	setTimeout(
		function() {
			elementToBePulsed.classList.add('changesAreAnimated');
			elementToBePulsed.classList.remove('pulseOn');
		}, 100);

	// Once that animation is complete (I assume by 1 second later), we remove the changesAreAnimated class, so that when we set the background back to green on the next click it happens suddenly without being animated in.  I think that looks cooler.
	setTimeout(
		function() {
			elementToBePulsed.classList.remove('changesAreAnimated');
		}, 500);
}




// This function fills in the "Advanced Parameters" input boxes with default values.  It is called at pageload and when the "reset to defaults" link is clicked.
function setAdvancedParametersToDefaults() {
	salaryMultiplierBox.value = '1.5';
	companyProfitBox.value = '50';
}

// Sets "Advanced Parameters" to default on pageload
setAdvancedParametersToDefaults();

resetToDefaultLink.addEventListener("click", function() {
	setAdvancedParametersToDefaults
	pulseElement(salaryMultiplierBox);
	pulseElement(companyProfitBox);

});


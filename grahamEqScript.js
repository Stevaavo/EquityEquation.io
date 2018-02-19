


// calling out all the input boxes
var equityNumBox = document.querySelector('#equityNumBox');
var salaryNumBox = document.querySelector('#salaryNumBox');
var valueNumBox = document.querySelector('#valueNumBox');
var vMultiplierBox = document.querySelector('#vMultiplierBox');
var salaryMultiplierBox = document.querySelector('#salaryMultiplierBox');
var companyProfitBox = document.querySelector('#companyProfitBox');

var allVarInputBoxes = document.getElementsByName('varInputBox');
var allVarInputTDs = document.querySelectorAll('.inputTD');


// calling out the radio buttons
var equityRadio = document.querySelector('#equityRadio');
var salaryRadio = document.querySelector('#salaryRadio');
var valueRadio = document.querySelector('#valueRadio');
var vMultiplierRadio = document.querySelector('#vMultiplierRadio');
var allOutputRadioButtons = document.getElementsByName('outputRadio');

// calling out the calculate and reset-to-default buttons
var calculateButton = document.querySelector('#calculateButton');
var resetToDefaultLink = document.querySelector('#resetToDefaultLink');

// open variables for each input
var equity = null;
var salary = null;
var companyValue = null;
var vMultiplier = null;
var salaryMultiplier = null;
var companyProfit = null;

// calling out the error text box
var errorTextBox = document.querySelector('#errorTextBox');


var hasTheUserChosenAnOutput = false;


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



// This code controls what happens when the user clicks one of the radio buttons. We start by connecting all the radio buttons to a single on-click handler function.
equityRadio.addEventListener("click", outputRadioClickHandler);
salaryRadio.addEventListener("click", outputRadioClickHandler);
valueRadio.addEventListener("click", outputRadioClickHandler);
vMultiplierRadio.addEventListener("click", outputRadioClickHandler);

// This function greys out and puts a background behind the proper input box every time a radio button is clicked.
function outputRadioClickHandler() {

	hasTheUserChosenAnOutput = true;

	for (i = 0; i < allOutputRadioButtons.length; i++) {
		allOutputRadioButtons[i].classList.remove('glowingUntilClicked');

		if (allOutputRadioButtons[i].checked) {
			allVarInputBoxes[i].disabled = true;
			allVarInputTDs[i].classList.add('chosenOutput');
			allVarInputBoxes[i].classList.remove('errorGlow');
		}
		else{
			allVarInputBoxes[i].disabled = false;
			allVarInputBoxes[i].classList.remove('thisNumberWasComputed');
			allVarInputTDs[i].classList.remove('chosenOutput');
		}

	}

}

calculateButton.addEventListener("click", function() {solveGrahamEquation(true)});

function appendErrorMessage(errorMessage) {
	var newErrorP = document.createElement('p');
	newErrorP.innerHTML = errorMessage;
	errorTextBox.appendChild(newErrorP);
}

function solveGrahamEquation(verboseErrors) {


	var thereIsAnError = false;

	errorTextBox.innerHTML = ""



// If the user hasn't chosen an output via a radio button yet, we check to see if he did so implicitly by filling in all but one box.  If they have, we click that radio button for them.
	if (!hasTheUserChosenAnOutput) {
	var numberOfInputsWithoutValues = 0;
	var implicitlyChosenRadioButton = null;

		for (i=0; i<allVarInputBoxes.length; i++) {
			allVarInputBoxes[i].classList.remove('errorGlow');

			if (allVarInputBoxes[i].value == "") {
				numberOfInputsWithoutValues++;
				implicitlyChosenRadioButton = i;
			}
		}

		if (numberOfInputsWithoutValues == 1) {
			allOutputRadioButtons[implicitlyChosenRadioButton].click();
		}

	}



	for (i = 0; i < allOutputRadioButtons.length; i++) {

	}

	if (equityNumBox.classList.contains('chosenOutput') || equityRadio.checked){ //do nothing, contents don't matter because they're being assigned. Checking both of these conditions just in case my radio listener code fails.
		
	}
	else if(equityNumBox.value > 100) {
		thereIsAnError = true;

		if (verboseErrors) {
			thereIsAnError = true;
			equityNumBox.classList.add('errorGlow');
			appendErrorMessage("Sorry, you can't own more than 100% of the company. <a href='https://en.wikipedia.org/wiki/The_Producers_(1967_film)'>Not even Mel Brooks</a> could pull that off.")

		}
	}
	else if (equityNumBox.value < 0) {
			thereIsAnError = true;
			equityNumBox.classList.add('errorGlow');
			appendErrorMessage("The 'equity' number should be more than zero.")
	}
	else if (equityNumBox.value == "") {
		thereIsAnError = true;

		if (verboseErrors) {
			equityNumBox.classList.add('errorGlow');
			appendErrorMessage('You need to fill in 3 of the four numbers above in order to run the equation.')

		}

	}





	equity = equityNumBox.value;
	salary = salaryNumBox.value;
	companyValue = valueNumBox.value;
	vMultiplier = vMultiplierBox.value;
	salaryMultiplier = salaryMultiplierBox.value;
	companyProfit = companyProfitBox.value;


}



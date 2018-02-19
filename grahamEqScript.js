


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
	salaryMultiplierBox.value = '50';
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
		allOutputRadioButtons[i].classList.remove('errorGlow');

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

	solveGrahamEquation(false);

}


for (i=0; i<allVarInputBoxes.length; i++) {
	allVarInputBoxes[i].addEventListener("change", function() {solveGrahamEquation(false)});
}

salaryMultiplierBox.addEventListener("change", function() {solveGrahamEquation(false)});
companyProfitBox.addEventListener("change", function() {solveGrahamEquation(false)});



function setUnfilledInputBoxesToZero() {
	for (i=0; i<allVarInputBoxes.length; i++) {
		if (allVarInputBoxes[i].value == "") {
			allVarInputBoxes[i].value = 0;
		}
	}
	solveGrahamEquation(false);
}


calculateButton.addEventListener("click", function() {solveGrahamEquation(true)});

function appendErrorMessage(errorMessage) {
	var newErrorP = document.createElement('p');
	newErrorP.innerHTML = errorMessage;
	errorTextBox.appendChild(newErrorP);
}


function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


function solveGrahamEquation(verboseErrors) {


	var thereIsAnError = false;
	var thereAreUnfilledBoxes = false;

	errorTextBox.innerHTML = ""



// If the user hasn't chosen an output via a radio button yet, we check to see if he did so implicitly by filling in all but one box.  If they have, we click that radio button for them.
	if (!hasTheUserChosenAnOutput) {
	var numberOfInputsWithoutValues = 0;
	var implicitlyChosenRadioButton = null;

		for (i=0; i<allVarInputBoxes.length; i++) {

			if (allVarInputBoxes[i].value == "") {
				numberOfInputsWithoutValues++;
				implicitlyChosenRadioButton = i;
			}
		}

		if (numberOfInputsWithoutValues == 1) {
			allOutputRadioButtons[implicitlyChosenRadioButton].click();
		}
		else if (numberOfInputsWithoutValues == 0) {
			appendErrorMessage('Please select the value that you want to calculate.');

			for (i = 0; i < allOutputRadioButtons.length; i++) {
				allOutputRadioButtons[i].classList.remove('glowingUntilClicked');
				allOutputRadioButtons[i].classList.add('errorGlow');
			}

		}

	}




// Check the equity input box for errors.
	if (equityRadio.checked){ //do nothing except clear the current value. We don't need to error-chek the current contents because they're being assigned.
		equityNumBox.value = "";
	}
	else if(equityNumBox.value > 100) {
		thereIsAnError = true;

		if (verboseErrors) {
			thereIsAnError = true;
			equityNumBox.classList.add('errorGlow');
			appendErrorMessage("Sorry, you can't own more than 100% of the company. <a href='https://en.wikipedia.org/wiki/The_Producers_(1967_film)'>Not even Mel Brooks</a> could pull that off.");

		}
	}
	else if (equityNumBox.value < 0) {
		thereIsAnError = true;
		if (verboseErrors) {
			equityNumBox.classList.add('errorGlow');
			appendErrorMessage("The 'equity' number should be more than zero.");
		}
	}
	else if (equityNumBox.value == "") {
		thereIsAnError = true;
		thereAreUnfilledBoxes = true;
		if (verboseErrors) {
			equityNumBox.classList.add('errorGlow');
		}
	}
	else {equityNumBox.classList.remove('errorGlow');} // if all is well, remove any previous warning animation.

// Check the salary input box for errors.
	if (salaryRadio.checked){  //do nothing except clear the current value. We don't need to error-chek the current contents because they're being assigned.
		salaryNumBox.value = "";
		}
	else if (salaryNumBox.value < 0) {
		if (verboseErrors) {
			appendErrorMessage("Heads up: You specified a negative number for your salary.  That's weird and maybe an error, but I calculated the equation with your negative number anyway, in case you mean that you're paying cash into the company that you're joining.");
		}
	}
	else if (salaryNumBox.value == "") {
		thereIsAnError = true;
		thereAreUnfilledBoxes = true;
		console.log('salary unfilled');

		if (verboseErrors) {
			salaryNumBox.classList.add('errorGlow');
		}
	}
	else {salaryNumBox.classList.remove('errorGlow');} // if all is well, remove any previous warning animation.


// Check the valuation input box for errors.
	if (valueRadio.checked){  //do nothing except clear the current value. We don't need to error-chek the current contents because they're being assigned.
		valueNumBox.value = "";
		}
	else if (valueNumBox.value < 0) {
		if (verboseErrors) {
			appendErrorMessage("Heads up: You specified a negative number for the value of the company.  That's weird and maybe an error, but I calculated the equation with your negative number anyway, in case you're trying something... creative.");
		}
	}
	else if (valueNumBox.value == "") {
		thereIsAnError = true;
		thereAreUnfilledBoxes = true;
		
		if (verboseErrors) {
			valueNumBox.classList.add('errorGlow');
		}
	}
	else {valueNumBox.classList.remove('errorGlow');} // if all is well, remove any previous warning animation.

// Check the valuation multiplier input box for errors.
	if (vMultiplierRadio.checked){  //do nothing except clear the current value. We don't need to error-chek the current contents because they're being assigned.
		vMultiplierBox.value = "";
	}
	else if (vMultiplierBox.value < 0) {
		thereIsAnError = true;
		if (verboseErrors) {
			vMultiplierBox.classList.add('errorGlow');
			appendErrorMessage("The 'Valuation Multiplier' number should be more than zero.");
		}
	}
	else if (vMultiplierBox.value == "") {
		thereIsAnError = true;
		thereAreUnfilledBoxes = true;
		if (verboseErrors) {
			vMultiplierBox.classList.add('errorGlow');
		}
	}
	else {vMultiplierBox.classList.remove('errorGlow');} // if all is well, remove any previous warning animation.


// Check the salary multiplier input box for errors.
	if (salaryMultiplierBox.classList.contains('chosenOutput') || salaryMultiplierBox.checked){ //do nothing, contents don't matter because they're being assigned. Checking both of these conditions just in case my radio listener code fails.
	}
	else if (salaryMultiplierBox.value < 0) {
		thereIsAnError = true;
		if (verboseErrors) {
			salaryMultiplierBox.classList.add('errorGlow');
			appendErrorMessage("The 'Salary Multiplier' number should be more than zero.");
		}
	}
	else if (salaryMultiplierBox.value == "") {
		thereIsAnError = true;
		thereAreUnfilledBoxes = true;
		if (verboseErrors) {
			salaryMultiplierBox.classList.add('errorGlow');
		}
	}
	else {salaryMultiplierBox.classList.remove('errorGlow');} // if all is well, remove any previous warning animation.

// Check the profit input box for errors.
	if (companyProfitBox.classList.contains('chosenOutput') || companyProfitBox.checked){ //do nothing, contents don't matter because they're being assigned. Checking both of these conditions just in case my radio listener code fails.
	}
	else if (companyProfitBox.value <= 0) {
		thereIsAnError = true;
		if (verboseErrors) {
			companyProfitBox.classList.add('errorGlow');
			appendErrorMessage("The 'company's profit' number should be more than zero.");
		}
	}
	else if (companyProfitBox.value == "") {
		thereIsAnError = true;
		thereAreUnfilledBoxes = true;
		if (verboseErrors) {
			companyProfitBox.classList.add('errorGlow');
		}
	}
	else {companyProfitBox.classList.remove('errorGlow');} // if all is well, remove any previous warning animation.




	if (verboseErrors && thereAreUnfilledBoxes) {
		appendErrorMessage('Please fill in 3 of the four numbers above in order to run the equation, or <a id=setBlanksToZero onclick="setUnfilledInputBoxesToZero()" href="javascript:void(0);">click here</a> to set all the unfilled boxes to zero.');
	}

	if (thereIsAnError) {
		return;
	}


// OK, if we've gotten this far, we're ready to actually run the numbers and make our calculation.  Let's get started.

	equity = equityNumBox.value/100;
	salary = salaryNumBox.value;
	companyValue = valueNumBox.value;
	vMultiplier = vMultiplierBox.value/100;
	salaryMultiplier = salaryMultiplierBox.value/100;
	companyProfit = companyProfitBox.value/100;

	if (equityRadio.checked) {
		equity = (1 - (1/(1 + vMultiplier)))/(1+companyProfit) - salary*(salaryMultiplier+1)/companyValue;

		equityNumBox.value = round(equity*100, 4);
		pulseElement(equityNumBox);
		equityNumBox.classList.remove('thisNumberWasComputed');
	}

	if (salaryRadio.checked) {
		salary = (equity - (1 - (1/(1 + vMultiplier)))/(1+companyProfit))*companyValue*-1/(1+salaryMultiplier);

		salaryNumBox.value = round(salary, 0);
		pulseElement(salaryNumBox);
		salaryNumBox.classList.remove('thisNumberWasComputed');

	}

	if (valueRadio.checked) {
		companyValue = 1/(equity - (1 - (1/(1 + vMultiplier)))/(1+companyProfit))*-1*salary*(1+salaryMultiplier);

		valueNumBox.value = round(companyValue, 0);
		pulseElement(valueNumBox);
		valueNumBox.classList.remove('thisNumberWasComputed');
	}

	if (vMultiplierRadio.checked) {
		vMultiplier = 1/(((equity + salary*(salaryMultiplier+1)/companyValue)*(companyProfit+1) - 1)*(-1))-1;

		vMultiplierBox.value = round(vMultiplier*100, 2);
		pulseElement(vMultiplierBox);
		vMultiplierBox.classList.remove('thisNumberWasComputed');
	}

}



(function(){
  'use strict';

  // Create a closure-pattern module to handle the form
  // This is good practice because it protects variables from other pieces that might be later added to page
  var formHandler = function(){
    /*
     * Initial variables, including DOM selections
     */

    var handlebarsAttach = document.getElementById('amounts-list'),
      amountsList = {
        annual: ['35', '60', '150', '250', '500'],
        monthly: ['4', '9', '17', '31', '63'],
        once: ['35', '60', '150', '250', '500']
      },
      currentFrequency = 'monthly', // Stores currently-selected donation frequency
      currValue = amountsList[currentFrequency][1], // Stores currently-selected donation amount
      donationForm = document.getElementById('form'), // The form
      formError = document.getElementById('form-error'), // Error message <p> tag
      selectedRadio = document.getElementById('amount-2'), // Store currently-selected radio button
      email = document.getElementById('email'), // Email field
      donatorName = document.getElementById('donator-name'), // Name field
      $formFrequencyButtons = $('.form__frequency-button');



    /*
     * A function that will later be exposed to public scope
     * This initializes the form handler
     * Right now, all that means it binding events, but we could add more to it later if form gets more complicated
     */

    var init = function(){
      _bindInitialEvents();
    };




    /*
     * Events
     */

    // Form submission
    // We actually do not submit the form but instead check if the selected amount is valid
    // If so, log it to console; if not, tell the user (more on that later)
    var _handleSubmit = function(e){
      e.preventDefault();

      if ( _checkFormValidity() ) {
        console.log(currValue);
      }
    };

    // Events related to the manual-amount entry field
    // On keyup, we want to update currentValue
    // On focus, we select its corresponding radio button
    var _handleManualEvents = function(){
      var $manual = $('#manual-entry');

      $manual.keyup(function(){
        currValue = $(this).val();
      });

      $manual.focus(function(){
        var $prev = $manual.prev();
        currValue = $(this).val();
        $prev.prop('checked', true);
        _storeSelectedRadio( $prev[0] );
      });
    };

    // Events related to radio buttons
    // If a preset-value radio is selected, we store its value
    // If the manual-entry radio is selected, we store the value in the input
    // We also cache the DOM reference of the selected radio for form validation (more on that later)
    var _handleRadioEvent = function(){
      $('.form__amount-radio').click(function(){
        var $this = $(this);

        if ($this.attr('id') === 'manual-radio') {
          currValue = $this.next().val();
        } else {
          currValue = $this.val();
        }

        _storeSelectedRadio($this[0]);
      });
    };

    // Events related to donation-frequency buttons
    var _handleFrequencyEvent = function(){
      $formFrequencyButtons.each(function(){
        var $this = $(this);

        $this.click(function(e){
          e.preventDefault();

          var newFrequency = $this.attr('data-frequency');

          if (newFrequency === currentFrequency) {
            // User clicked already-selected button, so do nothing
            return false;

          } else if ( _amountsRemainSame(newFrequency, currentFrequency) ) {
            // User clicked button with same values as currently selected button, so only update currentFrequency
            currentFrequency = newFrequency;

          } else {
            // User clicked button with different values, so update currentFrequency, update displayed values and update new initial currentValue
            currentFrequency = newFrequency;
            _updateAmounts();
            currValue = amountsList[currentFrequency][1];
          }

          // Add selected class to selected button
          $formFrequencyButtons.removeClass('selected');
          $this.addClass('selected');
        });
      });
    };

    // Called when module is initialized to bind events
    var _bindInitialEvents = function(){
      _handleManualEvents();
      _handleRadioEvent();
      _handleFrequencyEvent();
      donationForm.addEventListener('submit', _handleSubmit);
    };

    // When values update, re-store a few DOM references to we can quickly access them later
    var _storeNewDOMReferences = function(){
      email = document.getElementById('email');
      donatorName = document.getElementById('donator-name');
    };




    /*
     * DOM
     */

    // When a donation frequency with new values is selected, use Handlebars to show new markup
    // Also re-bind a few events to new elements
    var _updateAmounts = function(){
      var markup = Handlebars.templates.amounts({
        amounts: amountsList[currentFrequency]
      });

      handlebarsAttach.innerHTML = markup;
      _handleRadioEvent();
      _handleManualEvents();
      _storeNewDOMReferences();
    };

    // When a user selects a radio, cache the DOM reference to later for form validation
    var _storeSelectedRadio = function(el){
      selectedRadio.setCustomValidity('');
      selectedRadio = el;
    };

    // Toggle error message visibility based on form validity
    var _updateErrorMesssageVisiblity = function(state){
      var currClass = formError.className;

      if (state === 'show') {
        formError.className = currClass.replace('hidden', '');

      } else if (state === 'hide') {
        formError.className = currClass + ' hidden';
      }
    };




    /*
     * DOM
     */

    // Check if form has valid data
    var _checkFormValidity = function(){
      var errorText = '',
        valid = true;

      // If currentValue is not numeric or if it's empty, raise an error on the invalid form element (won't work on Safari, ugh)
      if ( isNaN(currValue) || currValue.trim() === '' ) {
        errorText += 'Please enter a valid donation amount.';
        _raiseInvalidAmountError();
        valid = false;
      }
      // If user did not enter name or email
      // These elements are marked as required, but Safari doesn't care about that
      if ( email.value.trim() === '' || donatorName.value.trim() === '' ) {
        errorText += ' Please enter a valid name and email address';
        valid = false;
      }

      // If it failed either of the two tests, do not log value and instead show an error message
      if (!valid) {
        _showErrorMessage(errorText);
        _updateErrorMesssageVisiblity('show');
      } else {
        _updateErrorMesssageVisiblity('hide');
      }

      // Return Boolean
      // If it's true, currentValue will get logged to console
      return valid;
    };

    //Show error message text
    var _showErrorMessage = function(errorText){
      formError.innerText = errorText;
    };

    // Raise HTML5 form validation error message
    var _raiseInvalidAmountError = function(){
      selectedRadio.setCustomValidity('Please enter a number.');
    };




    /*
     * Misc.
     */

    // Check whether a new donation-frequency selection has the same values as previous
    var _amountsRemainSame = function(newFrequency, currentFrequency){
      return (
        (newFrequency === 'annual' && currentFrequency === 'once') ||
        (newFrequency === 'once' && currentFrequency === 'annual')
      );
    };



    // Expose init() as public method
    return {
      init: init
    };
  };

  var formModule = formHandler();
  formModule.init();
})();

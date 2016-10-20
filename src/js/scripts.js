(function(){
  'use strict';

  var formHandler = function(){
    var handlebarsAttach = document.getElementById('amounts-list'),
      amountsList = {
        annual: ['35', '60', '150', '250', '500'],
        monthly: ['4', '9', '17', '31', '63'],
        once: ['35', '60', '150', '250', '500']
      },
      currentFrequency = 'monthly',
      currValue = amountsList[currentFrequency][1],
      donationForm = document.getElementById('form'),
      formError = document.getElementById('form-error'),
      selectedRadio = document.getElementById('amount-2'),
      email = document.getElementById('email'),
      donatorName = document.getElementById('donator-name');

    var init = function(){
      _bindInitialEvents();
    };

    var _handleSubmit = function(e){
      e.preventDefault();

      if ( _checkFormValidity() ) {
        console.log(currValue);
      }
    };

    var _updateAmounts = function(){
      var markup = Handlebars.templates.amounts({
        amounts: amountsList[currentFrequency]
      });

      handlebarsAttach.innerHTML = markup;
      _handleRadioEvent();
      _handleManualEvents();
      _storeNewDOMReferences();
    };

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

    var _handleFrequencyEvent = function(){
      $('.form__frequency-button').each(function(){
        var $this = $(this);

        $this.click(function(e){
          e.preventDefault();

          var newFrequency = $this.attr('data-frequency');

          if (newFrequency === currentFrequency) {
            return false;
          } else if ( _amountsRemainSame(newFrequency, currentFrequency) ) {
            currentFrequency = newFrequency;
          } else {
            currentFrequency = newFrequency;
            _updateAmounts();
            currValue = amountsList[currentFrequency][1];
          }
        });
      });
    };

    var _checkFormValidity = function(){
      var errorText = '',
        valid = true;

      if ( isNaN(currValue) || currValue.trim() === '' ) {
        errorText += 'Please enter a valid donation amount.';
        _raiseInvalidAmountError();
        valid = false;
      }
      if ( email.value.trim() === '' || donatorName.value.trim() === '' ) {
        errorText += ' Please enter a valid name and email address';
        valid = false;
      }
      if (!valid) {
        _showErrorMessage(errorText);
      }

      return valid;
    };

    var _storeNewDOMReferences = function(){
      email = document.getElementById('email');
      donatorName = document.getElementById('donator-name');
    };

    var _showErrorMessage = function(errorText){
      formError.innerText = errorText;
    };

    var _raiseInvalidAmountError = function(){
      selectedRadio.setCustomValidity('Please enter a number.');
    };

    var _storeSelectedRadio = function(el){
      selectedRadio.setCustomValidity('');
      selectedRadio = el;
    };

    var _amountsRemainSame = function(newFrequency, currentFrequency){
      return (
        (newFrequency === 'annual' && currentFrequency === 'once') ||
        (newFrequency === 'once' && currentFrequency === 'annual')
      );
    };

    var _bindInitialEvents = function(){
      _handleManualEvents();
      _handleRadioEvent();
      _handleFrequencyEvent();
      donationForm.addEventListener('submit', _handleSubmit);
    };

    return {
      init: init
    };
  };

  var formModule = formHandler();
  formModule.init();
})();



Handlebars.registerHelper('isDefaultSelected', function(index){
  'use strict';

  if (index === 1) {
    return 'checked';
  }

  return '';
});

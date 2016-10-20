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
      selectedRadio = document.getElementById('initial-selection');

    var init = function(){
      _bindEvents();
    };

    var _handleSubmit = function(e){
      e.preventDefault();

      if ( _submissionIsValid(currValue) ) {
        console.log(currValue);
      } else {
        console.warn('Invalid numeric value. At this point, the user knows he/she is just messing with us. Click it one more time, and you get an error message on the form.');
        _raiseInvalidError();
      }
    };

    var _updateAmounts = function(){
      var markup = Handlebars.templates.amounts({
        amounts: amountsList[currentFrequency]
      });

      handlebarsAttach.innerHTML = markup;
      _handleRadioEvent();
      _handleManualEvents();
    };

    var _handleManualEvents = function(){
      var $manual = $('#manual-entry');

      $manual.keyup(function(){
        currValue = $(this).val();
      });

      $manual.focus(function(){
        var $prev = $manual.prev();

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
          currValue = $(this).val();
        }

        _storeSelectedRadio($this[0]);
      });
    };

    var _submissionIsValid = function(currValue){
      return !isNaN(currValue);
    };

    var _raiseInvalidError = function(){
      selectedRadio.setCustomValidity('Please enter a number.');
    };

    var _storeSelectedRadio = function(el){
      selectedRadio = el;
    };

    var _amountsRemainSame = function(newFrequency, currentFrequency){
      return (
        (newFrequency === 'annual' && currentFrequency == 'once') ||
        (newFrequency === 'once' && currentFrequency == 'annual')
      );
    };

    var _bindEvents = function(){
      _handleManualEvents();
      _handleRadioEvent();
      document.getElementById('form').onsubmit = _handleSubmit;

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

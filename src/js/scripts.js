(function(){
  'use strict';

  var formHandler = function(){
    var form = document.getElementById('form'),
      $frequencyButtons = $('.form__frequency-button'),
      amountLabels = document.querySelectorAll('.form__amount-label'),
      amountsList = {
        annual: ['35', '60', '150', '250', '500'],
        monthly: ['4', '9', '17', '31', '63'],
        once: ['35', '60', '150', '250', '500']
      },
      currentFrequency = 'monthly';

    var init = function(){
      _bindEvents();
    };

    var _handleSubmit = function(e){
      e.preventDefault();
    };

    var _updateAmounts = function(frequency){
      var newAmounts = amountsList[frequency];



      currentFrequency = frequency;
    };

    var _bindEvents = function(){
      form.onsubmit = _handleSubmit;

      $frequencyButtons.each(function(i){
        var $this = $(this);

        $this.click(function(e){
          var frequency = $this.attr('data-frequency');

          if (frequency === currentFrequency) {
            return false;
          }

          _updateAmounts(frequency);
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

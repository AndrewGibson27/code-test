(function(){
  'use strict';

  var formHandler = function(){
    var form = document.getElementById('form'),
      $frequencyButtons = $('.form__frequency-button'),
      $radioButtons = $('.form__amount-radio'),
      handlebarsAttach = document.getElementById('amounts-list'),
      amountsList = {
        annual: ['35', '60', '150', '250', '500'],
        monthly: ['4', '9', '17', '31', '63'],
        once: ['35', '60', '150', '250', '500']
      },
      currentFrequency = 'monthly',
      currValue = amountsList[currentFrequency][1];

    var init = function(){
      _bindEvents();
    };

    var _handleSubmit = function(e){
      e.preventDefault();
    };

    var _updateAmounts = function(frequency){
      var markup = Handlebars.templates.amounts({
        amounts: amountsList[frequency]
      });

      handlebarsAttach.innerHTML = markup;
      currentFrequency = frequency;
    };

    var _bindEvents = function(){
      $radioButtons.click(function(){
        currValue = $(this).val();
      });

      form.onsubmit = _handleSubmit;

      $frequencyButtons.each(function(){
        var $this = $(this);

        $this.click(function(){
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

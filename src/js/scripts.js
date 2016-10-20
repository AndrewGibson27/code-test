(function(){
  'use strict';

  var formHandler = function(){
    var form = document.getElementById('form');
      //amountsList = document.getElementById('amounts-list');

    var init = function(){
      _bindEvents();
    };

    var _handleSubmit = function(e){
      e.preventDefault();
    };

    var _bindEvents = function(){
      form.onsubmit = _handleSubmit;
    };

    return {
      init: init
    };
  };

  var formModule = formHandler();
  formModule.init();
})();

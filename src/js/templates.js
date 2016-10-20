// A Handlebars helper to mark a default-selected radio when list is re-rendered
Handlebars.registerHelper('isDefaultSelected', function(index){
  'use strict';

  if (index === 1) {
    return 'checked';
  }

  return '';
});

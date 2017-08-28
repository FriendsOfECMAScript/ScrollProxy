'use strict';

(function($, ScrollBasicStickyObserver){

  $(function(){

    var $stickyTodos = $('.sticky-todo');

    $stickyTodos.each(function(index, element){
      var $container = $(element),
        $sticky = $container.find('.sticky-header');
      new ScrollBasicStickyObserver($sticky[0], $container[0]);
    });
  });

})(jQuery, window.ScrollBasicStickyObserver);

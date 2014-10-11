/*!
 * Administer v0.0.0
 * Admin Template
 * ---------------------------------------
 * ©2014 Luis Reyes - <luis@luisreyes.com>
 * Twitter: @luisreyesdev
 */


/*! app.js - Main App Scripts Closure - START */

var Administer = (function(){

  var inited = false;

  function init(){
    if(inited) return; inited = true;

    modules.navigation.init();

  }

  return {
    init: init()
  };

})();

/*! app.js - Main App Scripts Closure - END */


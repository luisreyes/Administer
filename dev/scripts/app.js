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
/*!
 * Administer v0.0.0
 * Admin Template
 * ---------------------------------------
 * ©2014 Luis Reyes - <luis@luisreyes.com>
 * Twitter: @luisreyesdev
 */

var modules = (function(){

/*! modules.js - Modules Closure - START */

  var m = {};

m.navigation = (function(){
  
  var 
  inited = false,
  
  // Collections
  nav, 
  items;

  function init(){
    if(inited) return;
    
    // <NAV> HTML Element
    nav = document.getElementsByTagName('nav')[0];
    
    // First Level <LI> of <UL> HTML Element
    items = nav.getElementsByTagName('UL')[0].children;

    var i = 0, l = items.length;

    for(l;l>i;i++){
      console.log(items[i]);
      items[i].addEventListener('click', onItemClick);
    }
    
    inited = true;
  }

  function onItemClick(event){
    
    var
    // LI Element that is beign handled 
    li = getParentElement(event.target, 'LI'),
    // Parent UL of the Element being handled
    ul = getParentElement(li, 'UL'),
    // All LIs in the UL 
    items = ul.children;
    
    // Loop through all LIs to close
    for(var i in items){
      // Check and skip the LI that is to be selected
      // This will help the toggle
      if(!apollo.hasClass(li, 'selected')){
        // Close other LIs
        apollo.removeClass(items.item(i), 'selected');
      }
    }

    // Set Selected Items (LI)
    setSelected(li, true);

    // Reset the subitems to close state
    ul = li.getElementsByTagName('ul')[0];
    // If the LI has a child UL
    if(ul){
      items = ul.children;
      
      // Loop through LI children in the UL
      for(var i in items){
        // Close children LIs
        apollo.removeClass(items.item(i), 'selected');
      }
    }
  }

  function getParentElement(element, lookup){
    var result = element;
    
    if(element.tagName === lookup.toUpperCase()){
      result = element;
    }else{
      while (result.tagName != lookup.toUpperCase()){
        result = result.parentNode;
      }
    }

    return result;
    
  }

  function setSelected(element, toggle){
    if(toggle){
      apollo.toggleClass(element, 'selected');
    }else{
      apollo.addClass(element, 'selected');
    }

  }

  return{
    init: init

  };

})();


/*! modules.js - Modules Closure - END */

return m;

})();
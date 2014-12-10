  var target = document.documentElement;

  // create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation);
    });    
  });
   
  // configuration of the observer:
  var config = { attributes: true,
                 childList: true,
                 characterData: true,
                 subtree: true };
   
  // pass in the target node, as well as the observer options
  observer.observe(target, config);

  // This triggers CharacterData mutation correctly
  // setTimeout(function(){
  //   document.body.innerText = "Changed through Javascript.";
  // }, 5000);
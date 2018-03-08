function Config() {

  }
  
  Config.prototype.addBlockedSite = function(domain, color) {
      console.log("config add block")
      chrome.storage.sync.get(domain, (items) => {
        console.log("items: " + items[domain])
        if(items[domain]) {
            console.log('true')
            chrome.tabs.executeScript({
                code: `document.body.style.backgroundColor="${items[domain]}";`
              });
        } else {
            //{'mon':true, 'tue':true, 'wed':true, 'thu':true, 'fri':true, 'sat':true, 'sun':true}
            chrome.storage.sync.set({domain: "yellow"}) 
                // Notify that we saved.
            console.log('Settings saved');
            chrome.tabs.executeScript({
                code: 'document.body.style.backgroundColor="pink";'
                });
        }
      });
  };
 
  Config.prototype.isBlockedSite = function(domain) {
    chrome.storage.sync.get(domain, (items) => {
        console.log("items: " + items[domain])
        if(items[domain]) {
            console.log('true')
            return true
        } 
        console.log('false')
        return false
      });
      console.log('false out')
      return false
  };
  
 
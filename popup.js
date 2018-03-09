function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    var domain = new URL(url).hostname
    console.log(domain)
    callback(domain);
  });
}

function getSavedStatus(domain, callback) {
  if (localStorage.sites) {
    var sites = JSON.parse(localStorage.sites)
    callback(sites[domain])
  }
  callback(null)
}


document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((domain) => {
    var button = document.getElementById('actionButton');
    document.getElementById('currentSite').innerHTML = domain
    console.log(domain)
    // button.innerHTML = "Set Warning"
    // button.setAttribute("class", "addWarning")
    if (localStorage.sites) {
      var sites = JSON.parse(localStorage.sites)
      var isBlocked = sites[domain] == null ? false : true
      if (isBlocked) {
        button.innerHTML = "Disable Warnings";
        button.setAttribute("class", "removeWarning")
      } else {
        button.innerHTML = "Set Warnings";
        button.setAttribute("class", "addWarning")
      }
    }

    button.addEventListener('click', () => {
      if (button.className == "addWarning") {
        button.innerHTML = "Saved"
        button.setAttribute("class", "savedWarning")
        button.setAttribute("disabled", "disabled")
        addWarning(domain)
      } else if(removeWarning){
        button.innerHTML = "Removed Warning";
        button.setAttribute("class", "savedWarning")
        button.setAttribute("disabled", "disabled")
        removeWarning(domain)
      }
    });
  });
});

function removeWarning(domain) {
  if (localStorage.sites) {
    var sites = JSON.parse(localStorage.sites);
    if (sites[domain]) {
      delete sites[domain]
      localStorage.sites = JSON.stringify(sites);
    }
  }
}

function addWarning(domain) {
  if (!localStorage.sites) {
    localStorage.sites = JSON.stringify({})
  }
  var sites = JSON.parse(localStorage.sites);
  //{"mon":true, "tue":true, "wed":true, "thu":true, "fri":true, "sat":true, "sun":true}
  sites[domain] = true
  localStorage.sites = JSON.stringify(sites);
}

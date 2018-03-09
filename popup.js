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
    callback(domain);
  });
}

function getSavedStatus(domain, callback) {
  if (!localStorage.sites) {
    callback(null)
  } else {
    var sites = JSON.parse(localStorage.sites)
    if (!sites[domain]) {
      callback(null)
    } else {
      callback(sites[domain])
    }
  }

}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((domain) => {
    var button = document.getElementById('actionButton');
    button.innerHTML = "Set Warning"
    document.getElementById('currentSite').innerHTML = domain
    button.setAttribute("class", "addWarning")

    getSavedStatus(domain, (status) => {
      if (status) {
        button.innerHTML = "Disable Warnings";
        button.setAttribute("class", "removeWarning")
      } else {
        button.innerHTML = "Set Warnings";
        button.setAttribute("class", "addWarning")
      }
    });
    button.addEventListener('click', () => {
      if (!localStorage.sites) {
        localStorage.sites = JSON.stringify({})
      }
      var sites = JSON.parse(localStorage.sites);
      if (!sites[domain]) {
        //{"mon":true, "tue":true, "wed":true, "thu":true, "fri":true, "sat":true, "sun":true}
        sites[domain] = true;
        localStorage.sites = JSON.stringify(sites);
        button.setAttribute("disabled", "disabled")
        button.innerHTML = "Saved"
        button.setAttribute("class", "saveWarning")

      } else {
        button.innerHTML = "Disable Warnings";
        button.setAttribute("class", "removeWarning")
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
      alert("You've disabled the warning")
    }
  }
}
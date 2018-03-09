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

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((domain) => {
    var actionButton = document.getElementById('actionButton');
    var editButton = document.getElementById('editButton');
    document.getElementById('currentSite').innerHTML = domain

    setActionButtonLabel(actionButton, domain)
    setActionButtonListener(actionButton, domain)

    toggleEditButton(editButton, actionButton)
    setEditButtonListener(editButton, domain)
  });
});

function toggleEditButton(edit, action) {
  if (action.className == "addWarning") {
    edit.style.display = "none";
  } else if (action.className == "removeWarning") {
    edit.style.display = "block";
  }
}

// function setCheckboxListener() {
//   $("input[name='day']").each(() => {
//   addEventListener('change', () => {
//       let checked = checkbox.is(':checked')
//       console.log(checkbox.value)
//   });
// })
// }


function setActionButtonListener(button, domain) {
  button.addEventListener('click', () => {
    if (button.className == "addWarning") {
      button.innerHTML = "Saved"
      button.setAttribute("class", "savedWarning")
      button.setAttribute("disabled", "disabled")
      addWarning(domain)
    } else if (button.className == "removeWarning") {
      button.innerHTML = "Removed Warning";
      button.setAttribute("class", "savedWarning")
      button.setAttribute("disabled", "disabled")
      removeWarning(domain)
    }
  });
}

function setActionButtonLabel(button, domain) {
  if (localStorage.sites) {
    var sites = JSON.parse(localStorage.sites)
    var isBlocked = sites[domain] == null ? false : true
    if (isBlocked) {
      button.innerHTML = "Disable Warnings";
      button.setAttribute("class", "removeWarning")
      showCurrentWarningDays(sites[domain])
    } else {
      button.innerHTML = "Set Warnings";
      button.setAttribute("class", "addWarning")
    }
  } else {
    button.innerHTML = "Set Warnings";
    button.setAttribute("class", "addWarning")
  }
}

function showCurrentWarningDays(value) {
  var checkboxes = document.getElementsByName('day');
  for (var i = 0; i < checkboxes.length; ++i) {
    let day = checkboxes[i]
    let dow = day.value
    day.checked = value[dow]
  }
}

function removeWarning(domain) {
  if (localStorage.sites) {
    var sites = JSON.parse(localStorage.sites);
    if (sites[domain]) {
      delete sites[domain]
      localStorage.sites = JSON.stringify(sites);
    }
  }
}


function setEditButtonListener(button, domain) {
  button.addEventListener('click', () => {
    if (localStorage.sites) {
      var sites = JSON.parse(localStorage.sites);
      if (sites[domain]) {
        var value = sites[domain]
        var checkboxes = document.getElementsByName('day');
        for (var i = 0; i < checkboxes.length; ++i) {
          let day = checkboxes[i]
          let dow = day.value
          value[dow] = day.checked
        }
        sites[domain] = value
        localStorage.sites = JSON.stringify(sites);
      }
      button.setAttribute("disabled", "disabled")
    }
  })
}

function addWarning(domain) {
  if (!localStorage.sites) {
    localStorage.sites = JSON.stringify({})
  }
  var sites = JSON.parse(localStorage.sites);
  var value = { "mon": true, "tue": true, "wed": true, "thu": true, "fri": true, "sat": true, "sun": true }
  var checkboxes = document.getElementsByName('day');
  for (var i = 0; i < checkboxes.length; ++i) {
    let day = checkboxes[i]
    let dow = day.value
    value[dow] = day.checked
  }
  sites[domain] = value
  localStorage.sites = JSON.stringify(sites);
}

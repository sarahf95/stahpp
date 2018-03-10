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

    setSliderListener(domain)
  });
});

function toggleEditButton(edit, action) {
  if (action.className == "addWarning") {
    edit.style.display = "none";
  } else if (action.className == "removeWarning") {
    edit.style.display = "block";
  }
}

function setActionButtonListener(button, domain) {
  button.addEventListener('click', () => {
    if (button.className == "addWarning") {
      button.innerHTML = "Saved"
      button.setAttribute("class", "savedAdd")
      button.disabled = true
      addWarning(domain)
    } else if (button.className == "removeWarning") {
      button.innerHTML = "Removed Warning";
      button.setAttribute("class", "savedRemove")
      button.disabled = true
      document.getElementById('editButton').disabled = true
      disableCheckBoxes()
      disableSlider()
      removeWarning(domain)
    }
  });
}

function disableSlider() {
  var slider = document.getElementById("snooze");
  var label = document.getElementById("snoozeLabel");

  slider.disabled = true
  label.setAttribute("class", "disabledSliderLabel")
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

function disableCheckBoxes() {
  var checkboxes = document.getElementsByName('day');
  for (var i = 0; i < checkboxes.length; ++i) {
    let day = checkboxes[i]
    day.disabled = true
  }
}

function removeWarning(domain) {
  if (localStorage.sites) {
    var sites = JSON.parse(localStorage.sites);
    if (sites[domain]) {
      delete sites[domain]
      if(Object.keys(sites).length == 0) {
        localStorage.snoozeTime = 10
      }
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

function setSliderListener(domain) {
  if(!localStorage.snoozeTime) {
    localStorage.snoozeTime = 10
  }
  var sites = JSON.parse(localStorage.sites)
  var slider = document.getElementById("snooze");
  var label = document.getElementById("snoozeValue");
  slider.value = localStorage.snoozeTime
  label.innerHTML = slider.value;

  slider.oninput = () => {
    if(sites[domain]) {
      snoozeValue.innerHTML = slider.value;
      localStorage.snoozeTime = slider.value;
    } else {
      disableSlider()
    }
  }
}

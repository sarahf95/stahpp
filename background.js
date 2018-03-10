// variables that stay constant for all popups
var currentDomain = ""
let indexToDayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
var startTime = null
var sentAlert = false

/**
 * onUpdated fires when any tab in chrome has an update.
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // get the current date to compare to the last time 
    let date = new Date()
    let dow = date.getDay();
    // initialize localstorage
    if (!localStorage.sites) {
        localStorage.sites = JSON.stringify({})
    }
    if(!localStorage.snoozeTime) {
        localStorage.snoozeTime = 10
    }
    var sites = JSON.parse(localStorage.sites);
    // get current active tab in current window that was just updated
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let tab = tabs[0]
        let domain = new URL(tab.url).hostname
        // check if user went to a new site
        if (domain != currentDomain) {
            currentDomain = domain
            let value = sites[domain]
            // check that user wants warning on current day of the week
            if (value && value[indexToDayOfWeek[dow]]) {
                alert(`Are you sure you want to spend time at ${domain}???`)
            }
        // if the user has been on the same tab that has updated then send a warning if they
        // have spent more than a certain amount of time on the site
        } else if (domain == currentDomain) {
            let value = sites[domain]
            if (value && value[indexToDayOfWeek[dow]]) {
                let start = startTime.getTime()
                let curr = date.getTime()
                if(curr - start >= 60000 * localStorage.snoozeTime) {
                // if (curr - start >= 1000 * localStorage.snoozeTime) {   // TESTING ONLY - 5 seconds
                    let totTime = curr - start
                    let mins = Math.round(((totTime % 86400000) % 3600000) / 60000);
                    // let mins = Math.round(((totTime % 86400000) % 3600000) / 1000); // TESTING ONLY - seconds
                    alert(`You have spent ${mins} minutes on this site since the last warning.`)
                    // set startTime to the current time to keep track of how long since they last left the page
                    startTime = new Date()
                }
            }
        }
    })
})

/**
 * onActivated fires when the user changes to a new tab
 */
chrome.tabs.onActivated.addListener((activeInfo) => {
    let date = new Date()
    let dow = date.getDay();
    if (!localStorage.sites) {
        localStorage.sites = JSON.stringify({})
    }
    if(!localStorage.snoozeTime) {
        localStorage.snoozeTime = 10
    }
    // get the current tab url with help from the tabs.get api method
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        let domain = new URL(tab.url).hostname
        if (domain != currentDomain) {
            currentDomain = domain
            if (localStorage.sites) {
                var sites = JSON.parse(localStorage.sites);
                let value = sites[domain]
                if (value && value[indexToDayOfWeek[dow]]) {
                    alert(`Are you sure you want to spend time at ${domain}???`)
                    startTime = date
                }
            }
        } else if (domain == currentDomain) {
            let value = sites[domain]
            if (value && value[indexToDayOfWeek[dow]]) {
                let start = startTime.getTime()
                let curr = date.getTime()
                if(curr - start >= 60000 * localStorage.snoozeTime) {
                // if (curr - start >= 1000 * localStorage.snoozeTime) {   // TESTING ONLY - seconds
                    let totTime = curr - start
                    let mins = Math.round(((totTime % 86400000) % 3600000) / 60000);
                    // let mins = Math.round(((totTime % 86400000) % 3600000) / 1000); // TESTING ONLY - seconds
                    alert(`You have spent ${mins} minutes on this site since the last warning.`)
                    startTime = new Date()
                }
            }
        }
    })
})
var currentDomain = ""
let indexToDayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
var startTime = null
var sentAlert = false

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let date = new Date()
    let dow = date.getDay();
    if (!localStorage.sites) {
        localStorage.sites = JSON.stringify({})
    }
    var sites = JSON.parse(localStorage.sites);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let tab = tabs[0]
        let domain = new URL(tab.url).hostname
        if (domain != currentDomain) {
            currentDomain = domain
            let value = sites[domain]
            if (value && value[indexToDayOfWeek[dow]]) {
                alert(`Are you sure you want to spend time at ${domain}???`)
            }
        } else if (domain == currentDomain) {
            let value = sites[domain]
            if (value) {
                let start = startTime.getTime()
                let curr = date.getTime()
                if(curr - start >= 600000) {
                // if(curr - start >= 5000) {   // TESTING ONLY - 5 seconds
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


chrome.tabs.onActivated.addListener((activeInfo) => {
    let date = new Date()
    let dow = date.getDay();
    if (!localStorage.sites) {
        localStorage.sites = JSON.stringify({})
    }
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        let domain = new URL(tab.url).hostname
        currentDomain = domain
        if (localStorage.sites) {
            var sites = JSON.parse(localStorage.sites);
            let value = sites[domain]
            if (value && value[indexToDayOfWeek[dow]]) {
                alert(`Are you sure you want to spend time at ${domain}???`)
                startTime = date
            }
        }
    })
})
var currentDomain = ""
let indexToDayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

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
            if (localStorage.sites) {
                let value = sites[domain]
                if (value && value[indexToDayOfWeek[dow]]) {
                    alert(`Are you sure you want to spend time at ${domain}???`)
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
            }
        }
    })
})
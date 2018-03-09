var currentDomain = ""

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    chrome.tabs.query({"active": true, "currentWindow": true}, (tabs) => {
        let tab = tabs[0]
        let domain = new URL(tab.url).hostname
        if(domain != currentDomain) {
            currentDomain = domain
            if (localStorage.sites) {
                var sites = JSON.parse(localStorage.sites);
                if (sites[domain]) {
                    alert(`Are you sure you want to spend time at ${domain}`)
                    // alert("onUpdated")
                }
            }
        }
    })
})


chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        let domain = new URL(tab.url).hostname
        currentDomain = domain
        if (localStorage.sites) {
            var sites = JSON.parse(localStorage.sites);
            if (sites[domain]) {
                alert(`Are you sure you want to spend time at ${domain}`)
                // alert("onActivated")
            }
        }
    })
})
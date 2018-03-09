chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let domain = changeInfo.url
    if (localStorage.sites) {
        var sites = JSON.parse(localStorage.sites);
        if (sites[domain]) {
            alert(`Are you sure you want to spend time at ${sites[domain]}`)
            console.log(`Are you sure you want to spend time at ${sites[domain]}`)

        }
    }
    console.log("in onUpdated")
})


chrome.tabs.onCreated.addListener((tabId, moveInfo) => {
    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onCreated")
    var logs = JSON.parse(localStorage.logs);
    logs["onCreated"] = ""
    localStorage.logs = JSON.stringify(logs);
})

chrome.tabs.onMoved.addListener((tab) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onMoved")
    var logs = JSON.parse(localStorage.logs);
    logs["onMoved"] = ""
    localStorage.logs = JSON.stringify(logs);
})

chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    var logs = JSON.parse(localStorage.logs);
    logs["actiaveted"] = activeInfo.tabId
    localStorage.logs = JSON.stringify(logs);
    alert(localStorage.logs);
    console.log("in onActivated")
    var logs = JSON.parse(localStorage.logs);
    logs["onActivated"] = ""
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        let domain = new URL(tab.url).hostname
        logs["domainActivated"] = domain
        localStorage.logs = JSON.stringify(logs);
        if (localStorage.sites) {
            var sites = JSON.parse(localStorage.sites);
            if (sites[domain]) {
                alert(`Are you sure you want to spend time at ${sites[domain]}`)
            }
        }
    })
})

chrome.tabs.onHighlighted.addListener((highlightInfo) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onHighlighted")
    var logs = JSON.parse(localStorage.logs);
    logs["onHighlighted"] = ""
    localStorage.logs = JSON.stringify(logs);
    chrome.tabs.get(tabId, (tab) => {
        let domain = new URL(tab.url).hostname
        console.log(domain)
        var logs = JSON.parse(localStorage.logs);
        logs["domainHighlighted"] = domain
        localStorage.logs = JSON.stringify(logs);
        if (localStorage.sites) {
            var sites = JSON.parse(localStorage.sites);
            if (sites[domain]) {
                alert(`Are you sure you want to spend time at ${sites[domain]}`)
                console.log(`Are you sure you want to spend time at ${sites[domain]}`)

            }
        }
    })
})

chrome.tabs.onDetached.addListener((tabId, detachInfo) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onDetached")
    var logs = JSON.parse(localStorage.logs);
    logs["onDetached"] = ""
    localStorage.logs = JSON.stringify(logs);
})

chrome.tabs.onAttached.addListener((tabId, attachInfo) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onAttached")
    var logs = JSON.parse(localStorage.logs);
    logs["onAttached"] = ""
    localStorage.logs = JSON.stringify(logs);
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onRemoved")
    var logs = JSON.parse(localStorage.logs);
    logs["onRemoved"] = ""
    localStorage.logs = JSON.stringify(logs);
})

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onReplaced")
    var logs = JSON.parse(localStorage.logs);
    logs["onReplaced"] = ""
    localStorage.logs = JSON.stringify(logs);
})

chrome.tabs.onZoomChange.addListener((ZoomChangeInfo) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onZoomChange")
    var logs = JSON.parse(localStorage.logs);
    logs["onZoomChange"] = ""
    localStorage.logs = JSON.stringify(logs);
})

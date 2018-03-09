chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onUpdated")
    alert("in updated")
    // chrome.tabs.get(changeInfo.url, (tab) => {
        // let domain = new URL(tab.url).hostname
        alert("tabid", tabId)
        if (localStorage.sites) {
            var sites = JSON.parse(localStorage.sites);
            if (sites[domain]) {
                alert(`Are you sure you want to spend time at ${changeInfo.url}`)
            }
        }
    // })
})


chrome.tabs.onCreated.addListener((tab) => {
    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onCreated")
    let domain = new URL(tab.url).hostname
    if (localStorage.sites) {
        var sites = JSON.parse(localStorage.sites);
        if (sites[domain]) {
            alert(`Are you sure you want to spend time at ${domain}`)
        }
    }
})

chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    // var logs = JSON.parse(localStorage.logs);
    // logs["actiaveted"] = activeInfo.tabId
    // localStorage.logs = JSON.stringify(logs);
    // console.log("in onActivated")
    // var logs = JSON.parse(localStorage.logs);
    // logs["onActivated"] = ""
    // logs["domainActivated"] = domain
    // localStorage.logs = JSON.stringify(logs);
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        let domain = new URL(tab.url).hostname
        if (localStorage.sites) {
            var sites = JSON.parse(localStorage.sites);
            if (sites[domain]) {
                alert(`Are you sure you want to spend time at ${domain}`)
            }
        }
    })
})

// chrome.tabs.onHighlighted.addListener((highlightInfo) => {

//     if (!localStorage.logs) {
//         localStorage.logs = JSON.stringify({})
//     }
//     console.log("in onHighlighted")
//     chrome.tabs.get(highlightInfo.tabIds[0], (tab) => {
//         let domain = new URL(tab.url).hostname
//         if (localStorage.sites) {
//             var sites = JSON.parse(localStorage.sites);
//             if (sites[domain]) {
//                 alert(`Are you sure you want to spend time at ${domain}`)
//             }
//         }
//     })
// })


///////

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

chrome.tabs.onMoved.addListener((tab) => {

    if (!localStorage.logs) {
        localStorage.logs = JSON.stringify({})
    }
    console.log("in onMoved")
    var logs = JSON.parse(localStorage.logs);
    logs["onMoved"] = ""
    localStorage.logs = JSON.stringify(logs);
})

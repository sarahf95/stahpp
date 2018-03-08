var currentDomain = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
        console.log("tab.onActivated");
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            var tab = tabs[0];
            var url = tab.url
            console.assert(typeof url == 'string', 'tab.url should be a string');   
            currentDomain = getDomainFromUrl(url)
            // setBackgroundColor(currentDomain, "purple")
        });  
 });

 chrome.tabs.onCreated.addListener((tab) => {
    console.log("tab.onCreated");
    var url = tab.url
    console.assert(typeof url == 'string', 'tab.url should be a string');   
    currentDomain = getDomainFromUrl(url)
    if(!localStorage.logs) {
        localStorage.logs = JSON.stringify({});
    } 
    var logs = JSON.parse(localStorage.logs);
    var sites = JSON.parse(localStorage.sites);
    logs[currentDomain] = sites[currentDomain]
    localStorage.logs = JSON.stringify(logs);
    // setBackgroundColor(currentDomain, "blue") 
 })

 chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {  
    console.log("tab.onUpdated");
    var url = changeInfo.url
    alert(url)
    console.assert(typeof url == 'string', 'tab.url should be a string');   
    currentDomain = getDomainFromUrl(url)
    // setBackgroundColor(currentDomain, "yellow") 
    // sendAlert(currentDomain)
  });

  chrome.tabs.onHighlighted.addListener((highlightInfo) => {  
    console.log("tab.onHighlighted");
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        var tab = tabs[0];
        var url = tab.url
        console.assert(typeof url == 'string', 'tab.url should be a string');   
        currentDomain = getDomainFromUrl(url)
        // setBackgroundColor(currentDomain, "pink")
    });  
  });

 chrome.windows.onFocusChanged.addListener((windowId) => {
    console.log("windows.onFocusChanged");
    if(windowId >= 0) {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            var tab = tabs[0];
            var url = tab.url
            console.assert(typeof url == 'string', 'tab.url should be a string');   
            currentDomain = getDomainFromUrl(url)
            // setBackgroundColor(currentDomain, "orange")
            console.log(currentDomain)
            sendAlert(currentDomain)
        });           
    }
  });

function getDomainFromUrl(url) {
    return new URL(url).hostname
}

function setBackgroundColor(site, color) {
    console.log("setBackGroundColor")
    if (!localStorage.sites) {
        localStorage.sites = JSON.stringify({});
      }
      var sites = JSON.parse(localStorage.sites);
      sites[site] = color;
      console.log("sites[site] = " + sites[site])
      localStorage.sites = JSON.stringify(sites);
      console.log(localStorage.sites)
      chrome.tabs.executeScript({
        code: `document.body.style.backgroundColor="${color}";`, runAt: 'document_start'
    });
}

function sendAlert(site) {
    console.log("sendAlert")
    if (localStorage.sites) {
      var sites = JSON.parse(localStorage.sites);
      console.log(sites[site])
      if(sites[site]) {
          alert("Are you sure you want to be on this site?")
      }
}

// function updateCounter() {
         
//     console.log("updating counter")
//     console.log(localStorage.sites)
//     console.log("localStorage.sites")
//       if (currentTabId == null) {
//         return;
//       }

//       chrome.tabs.get(currentTabId, function(tab) {
//         /* Make sure we're on the focused window, otherwise we're recording bogus stats. */
//         chrome.windows.get(tab.windowId, function(window) {
//           if (!window.focused) {
//             return;
//           }
//           var domain = getDomainFromUrl(tab.url)
//           if (domain == null) {
//             console.log("Unable to update counter. Malformed url.");
//             return;
//           }

//           /* We can't update any counters if this is the first time visiting any
//            * site. This happens on browser startup. Initialize some variables so
//            * we can perform an update next time. */
//           if (currentSite == null) {
//             currentSite = site;
//             startTime = new Date();
//             console.log("Current Site is " +currentSite);
//             console.log("Current Start Time is" +startTime);
//             return;
//           }

//           /* Update the time spent for this site by comparing the current time to
//            * the last time we were ran. */
//           var now = new Date();
//           var delta = now.getTime() - startTime.getTime();
//           updateTime(currentSite, "red");
//           setBackgroundColor(site)
//           /* This function could have been called as the result of a tab change,
//            * which means the site may have changed. */
//           currentSite = site;
//           console.log("The value is"+site);


//           startTime = now;
//           console.log("The Current Time is "+startTime);
//         });
//       });
//   }

//   function getCurrentTabUrl(callback) {
//     var queryInfo = {
//       active: true,
//       currentWindow: true
//     };
  
//     chrome.tabs.query(queryInfo, (tabs) => {
//       var tab = tabs[0];
//       var url = tab.url
//       console.assert(typeof url == 'string', 'tab.url should be a string');   
//       currentDomain = getDomainFromUrl(url)
//     });
  
//   }

//   function updateTime(site, color){
//      if (!localStorage.sites) {
//         localStorage.sites = JSON.stringify({});
//       }
//       console.log("updateTime")
//        var sites = JSON.parse(localStorage.sites);
//        console.log(localStorage.sites)
//        console.log("sites[site] = " + sites[site])
//       if (!sites[site]) {
//         sites[site] = "yellow";
//       }
//       sites[site] = color;
//       localStorage.sites = JSON.stringify(sites);
//       chrome.tabs.executeScript({
//         code: 'document.body.style.backgroundColor="orange";'
//     });
 
//   }

    // function addBlock(site, color){
    //     console.log("add block")
    //     if (!localStorage.sites) {
    //         localStorage.sites = JSON.stringify({});
    //     }
    //     console.log(localStorage.sites)
    //     var sites = JSON.parse(localStorage.sites);
    //     console.log(sites)
    //     sites[site] = color;
    //     localStorage.sites = JSON.stringify(sites);
    //     chrome.tabs.executeScript({
    //         code: 'document.body.style.backgroundColor="cyan";'
    //     });

    // }

    // console.log(document.getElementById('actionButton'))

    // if(document.readyState == 'complete') {
    //     console.log(document)
    //     console.log("is complete")
    //     getCurrentTabUrl((domain) => {
    //         console.log(domain)
    //         var actionButton = document.getElementById('actionButton');
    //         document.getElementById('currentSite').innerHTML = domain;
    //         actionButton.addEventListener("click", () => {
    //             console.log("onclick")
    //             addBlock(domain, "orange")
    //         });
    //         });
    // }else {
     
    //     console.log("is NOT complete")
    //     document.addEventListener('DOMContentLoaded', () => {
    //         console.log("add event listener: " + document)
    //         getCurrentTabUrl((domain) => {
    //         console.log(domain)
    //         var actionButton = document.getElementById('actionButton');
    //         document.getElementById('currentSite').innerHTML = domain;
    //         actionButton.addEventListener("click", () => {
    //             console.log("onclick")
    //             addBlock(domain, "orange")
    //         });
    //         });
    //     });
    // }


//       getCurrentTabUrl((domain) => {
//         console.log(domain)
//         var actionButton = document.getElementById("actionButton");
//         document.getElementById("currentSite").innerHTML = domain;
//         actionButton.addEventListener("click", () => {
//           console.log("onclick")
//           addBlock(domain, "gray")
//         });
//       });

  
//       window.addEventListener ("load", myMain, false);

//       function myMain (evt) {
//         getCurrentTabUrl((domain) => {
//             if (localStorage.sites) {
//                 console.log(localStorage.sites)
//                 var sites = JSON.parse(localStorage.sites);
//                 console.log(sites)
//                 if(sites[domain]) {
//                     chrome.tabs.executeScript({
//                         code: 'document.body.style.backgroundColor="cyan";'
//                     })
//                 }
//           }
//         })
// }

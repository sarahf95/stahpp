// // Copyright (c) 2014 The Chromium Authors. All rights reserved.
// // Use of this source code is governed by a BSD-style license that can be
// // found in the LICENSE file.

// var sites = JSON.parse(localStorage.sites);

// /**
//  * Get the current URL.
//  *
//  * @param {function(string)} callback called when the domain of the current tab
//  *   is found.
//  */
// function getCurrentTabUrl(callback) {
//   // Query filter to be passed to chrome.tabs.query - see
//   // https://developer.chrome.com/extensions/tabs#method-query
//   var queryInfo = {
//     active: true,
//     currentWindow: true
//   };

//   chrome.tabs.query(queryInfo, (tabs) => {
//     var tab = tabs[0];

//     // A tab is a plain object that provides information about the tab.
//     // See https://developer.chrome.com/extensions/tabs#type-Tab
//     var url = tab.url

//     // tab.url is only available if the "activeTab" permission is declared.
//     // If you want to see the URL of other tabs (e.g. after removing active:true
//     // from |queryInfo|), then the "tabs" permission is required to see their
//     // "url" properties.
//     console.assert(typeof url == 'string', 'tab.url should be a string');   
//     var domain = new URL(url).hostname
//     document.getElementById("currentSite").innerHTML = domain;
//     // alert(domain)
//     callback(domain);
//   });

// }

// function populatePopup() {
//   getCurrentTabUrl((domain) => {
//     var sites = bSites.blockedSites;
//     console.log(domain)
//     var button = document.getElementsByClassName("actionButton");
//     button.id = "addBlock"
//     // if(config.isBlockedSite(domain)) {
//     //   button.id = "removeBlock"
//     // } else {
//     //   button.id = "addBlock"
//     // }
//   });

// }

// /**
//  * Change the background color of the current page.
//  *
//  * @param {string} color The new background color.
//  */
// function changeBackgroundColor(color) {
//   // alert("changing color")
//   var script = 'document.body.style.backgroundColor="' + color + '";';
//   // See https://developer.chrome.com/extensions/tabs#method-executeScript.
//   // chrome.tabs.executeScript allows us to programmatically inject JavaScript
//   // into a page. Since we omit the optional first argument "tabId", the script
//   // is inserted into the active tab of the current window, which serves as the
//   // default.
//   chrome.tabs.executeScript({
//     code: script
//   });
// }

// /**
//  * Gets the saved background color for url.
//  *
//  * @param {string} domain URL whose background color is to be retrieved.
//  * @param {function(string)} callback called with the saved background color for
//  *     the given url on success, or a falsy value if no color is retrieved.
//  */
// function getSavedDomains(domain, callback) {
//   // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
//   // for chrome.runtime.lastError to ensure correctness even when the API call
//   // fails.
//   chrome.storage.sync.get(domain, (items) => {
//     console.log(items)
//     callback(chrome.runtime.lastError ? null : items[domain]);
//   });
// }

// /**
//  * Adds current domain to list of blocked sites
//  *
//  * @param {string} new_domain URL for which background color is to be saved.
//  */
// function addBlockedSite(new_domain) {
//   console.log("add blocked site popupjs")
//   config.addBlockedSite(new_domain, "blue")
//   return function() {
//     chrome.extension.sendRequest(
//        {action: "addBlockedSite", site: new_domain},
//        function(response) {
//          changeBackgroundColor();
//        });
//        console.log("sent request")
//   };
// }

// /**
//  * Sets the given background color for url.
//  *
//  * @param {string} domain URL for which background color is to be saved.
//  * @param {string} color The background color to be saved.
//  */
// function saveBackgroundColor(domain, color) {
//   console.log("save color: "  + domain)
//   var items = {};
//   items[domain] = color;
//   // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
//   // optional callback since we don't need to perform any action once the
//   // background color is saved.
//   console.log(items)
//   chrome.storage.sync.set(items);
// }

// // This extension loads the saved background color for the current tab if one
// // exists. The user can select a new background color from the dropdown for the
// // current page, and it will be saved as part of the extension's isolated
// // storage. The chrome.storage API is used for this purpose. This is different
// // from the window.localStorage API, which is synchronous and stores data bound
// // to a document's origin. Also, using chrome.storage.sync instead of
// // chrome.storage.local allows the extension data to be synced across multiple
// // user devices.
// document.addEventListener('DOMContentLoaded', () => {
//   getCurrentTabUrl((domain) => {
//     console.log(domain)
//     var actionButton = document.getElementById("actionButton");
//     actionButton.addEventListener("click", () => {
//       console.log("onclick")
//       addBlockedSite(domain)
//       // changeBackgroundColor("green");
//       // saveBackgroundColor(domain, "green");
//     });
//   });
// });
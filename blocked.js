/**
 * Stores the time that is spent on each site.
 *
 * The primary interface to this class is through setCurrentFocus.
 */
function Blocked(config) {
  this._config = config;
  if(!localStorage) {
    var localStorage = {}
    localStorage.blockedSites = JSON.stringify({});
}
  this._currentDomain = null;
}

/**
 * Returns the a dictionary of site -> seconds.
 */
Object.defineProperty(Blocked.prototype, "blockedSites", {
  get: function() {
    var s = JSON.parse(localStorage.blockedsites);
    var sites = {}
    for (var site in s) {
      if (s.hasOwnProperty(site) && this._config.isBlockedSite(site)) {
        sites[site] = s[site];
      }
    }
    return sites;
  }
});

/**
 * Returns just the site/domain from the url. Includes the protocol.
 * chrome://extensions/some/other?blah=ffdf -> chrome://extensions
 * @param {string} url The URL of the page, including the protocol.
 * @return {string} The site, including protocol, but not paths.
 */
Blocked.prototype.getDomainFromUrl = function(url) {
  var domain = new URL(url).hostname
  console.log(domain)
  return domain
};


/**
 * This method should be called whenever there is a potential focus change.
 * Provide url=null if Chrome is out of focus.
 */
Blocked.prototype.setCurrentFocus = function(url) {
  console.log("setCurrentFocus: " + url);
  this._updateTime();
  if (url == null) {
    this._currentDomain = null;
    this._startTime = null;
  } else {
    this._currentDomain = this.getDomainFromUrl(url);
    this._startTime = new Date();
  }
};



function UniversalAnalyticsPlugin() {}

UniversalAnalyticsPlugin.prototype.startTrackerWithId = function(id, dispatchPeriod) {
  return new Promise(function(resolve, reject){  
    if (typeof dispatchPeriod === 'undefined' || dispatchPeriod === null) {
      dispatchPeriod = 30;
    } else if (typeof dispatchPeriod === 'function' && typeof error === 'undefined') {
      // Called without dispatchPeriod but with a callback.
      // Looks like the original API was used so shift parameters over to remain compatible.
      reject = resolve;
      resolve = dispatchPeriod;
      dispatchPeriod = 30;
    }
  
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'startTrackerWithId', [id, dispatchPeriod]);
  });
};

UniversalAnalyticsPlugin.prototype.setAllowIDFACollection = function(enable) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'setAllowIDFACollection', [enable]);
  });
};

UniversalAnalyticsPlugin.prototype.setUserId = function(id) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'setUserId', [id]);
  });
};

UniversalAnalyticsPlugin.prototype.setAnonymizeIp = function(anonymize) {
  return new Promise(function(resolve, reject){  
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'setAnonymizeIp', [anonymize]);
  });
};

UniversalAnalyticsPlugin.prototype.setOptOut = function(optout) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'setOptOut', [optout]);
  });
};

UniversalAnalyticsPlugin.prototype.setAppVersion = function(version) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'setAppVersion', [version]);
  });
};

UniversalAnalyticsPlugin.prototype.getVar = function(variable) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'getVar', [variable]);
  });
};

UniversalAnalyticsPlugin.prototype.setVar = function(variable, value) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'setVar', [variable, value]);
  });
};

UniversalAnalyticsPlugin.prototype.dispatch = function() {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'dispatch', []);
  });
};

/* enables verbose logging */
UniversalAnalyticsPlugin.prototype.debugMode = function() {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'debugMode', []);
  });
};

UniversalAnalyticsPlugin.prototype.trackMetric = function(key, value) {
  return new Promise(function(resolve, reject){  
    // as key was formerly documented to be of type string, 
    // we need to at least accept string formatted numbers and pass the converted number
    var numberKey = key;
    if (typeof key === "string") {
      numberKey = Number.parseInt(key);
      if (isNaN(numberKey)) {
        throw Error("key must be a valid integer or string formatted integer");
      }
    }
  
    // as value was formerly documented to be of type string
    // and therefore platform implementations expect value parameter of type string,
    // we need to cast the value parameter to string - although gathered metrics are infact number types.
    var stringValue = value || "";
    if (typeof stringValue !== "string") {
      stringValue = String(value);
    }

    cordova.exec(resolve, reject, 'UniversalAnalytics', 'trackMetric', [numberKey, stringValue]);
  });
};

UniversalAnalyticsPlugin.prototype.trackView = function(screen, campaignUrl, newSession) {
  
  return new Promise(function(resolve, reject){
    if (typeof campaignUrl === 'undefined' || campaignUrl === null) {
      campaignUrl = '';
    }
  
    if (typeof newSession === 'undefined' || newSession === null) {
      newSession = false;
    } 
    
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'trackView', [screen, campaignUrl, newSession]);
  });
};

UniversalAnalyticsPlugin.prototype.addCustomDimension = function(key, value) {
  return new Promise(function(resolve, reject){
    if (typeof key !== "number") {
      return reject(Error("key must be a valid integer not '" + typeof key + "'"));
    }
    
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'addCustomDimension', [key, value]);
  });
};

UniversalAnalyticsPlugin.prototype.trackEvent = function(category, action, label, value, newSession) {
  return new Promise(function(resolve, reject){  
    if (typeof label === 'undefined' || label === null) {
      label = '';
    }
    if (typeof value === 'undefined' || value === null) {
      value = 0;
    }
  
    if (typeof newSession === 'undefined' || newSession === null) {
      newSession = false;
    }   

    cordova.exec(resolve, reject, 'UniversalAnalytics', 'trackEvent', [category, action, label, value, newSession]);
  });
};

/**
 * https://developers.google.com/analytics/devguides/collection/android/v3/exceptions
 */
UniversalAnalyticsPlugin.prototype.trackException = function(description, fatal) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'trackException', [description, fatal]);
  });
};

UniversalAnalyticsPlugin.prototype.trackTiming = function(category, intervalInMilliseconds, name, label) {
  return new Promise(function(resolve, reject){
    if (typeof intervalInMilliseconds === 'undefined' || intervalInMilliseconds === null) {
      intervalInMilliseconds = 0;
    }
    if (typeof name === 'undefined' || name === null) {
      name = '';
    }
    if (typeof label === 'undefined' || label === null) {
      label = '';
    }
    
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'trackTiming', [category, intervalInMilliseconds, name, label]);
  });
};

/* Google Analytics e-Commerce Tracking */
/* https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce */
UniversalAnalyticsPlugin.prototype.addTransaction = function(transactionId, affiliation, revenue, tax, shipping, currencyCode) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'addTransaction', [transactionId, affiliation, revenue, tax, shipping, currencyCode]);
  });
};

UniversalAnalyticsPlugin.prototype.addTransactionItem = function(transactionId, name ,sku, category, price, quantity, currencyCode) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'addTransactionItem', [transactionId, name ,sku, category, price, quantity, currencyCode]);
  });
};

/* automatic uncaught exception tracking */
UniversalAnalyticsPlugin.prototype.enableUncaughtExceptionReporting = function (enable) {
  return new Promise(function(resolve, reject){
    cordova.exec(resolve, reject, 'UniversalAnalytics', 'enableUncaughtExceptionReporting', [enable]);
  });
};

module.exports = new UniversalAnalyticsPlugin();

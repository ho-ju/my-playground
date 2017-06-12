/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  /**
  *  Custom Javascript
  */

  // Global Vars
  var myWii = null;
  var ejectTimer;
  var resetTimer;

  // Wii Constructor
  var Wii = function(hasPower) {
    this.hasPower = hasPower || false;
    this.driveLoaded = false;
    this.isResetting = false;
    this.isEjecting = false;
    this.isProcessing = false;
    this.isHorizontal = false;
    this.processingTime = 1500;
  };

  // Wii Prototype, bind variables and methods
  Wii.prototype = {

    /**
    * Turn Wii instance on or off and load drive
    */
    togglePower: function() {
      this.hasPower = !this.hasPower;

      // Console Logs
      if (this.hasPower) {
        console.log('==== Wii have power ====');
      } else {
        console.log('==== Wii wish you goodbye ====');
      }

      this.loadDrive();
      this.toggleClass(
        this.hasPower, 'btn-power', 'wii-box__ctrl--power--active'
      );
    },

    /**
    * Load Drive event of Wii instance
    */
    loadDrive: function() {
      this.driveLoaded = this.hasPower ? !this.driveLoaded : false;
      this.toggleClass(
        this.driveLoaded, 'cd-drive', 'wii-box__ctrl--cd--active'
      );
      // Console Logs
      if (this.driveLoaded) {
        console.log('==== Wii drive loaded ====');
      }
    },

    /**
    * Eject event of Wii instance
    */
    eject: function() {
      var wii = this;
      if (wii.hasPower && !wii.isProcessing) {
        wii.isEjecting = true;
        wii.toggleClass(
          wii.isEjecting, 'cd-drive', 'wii-box__ctrl--cd--eject'
        );
        wii.toggleProcessing();
        console.log('==== Wii are ejecting ====');

        window.clearTimeout(ejectTimer);
        ejectTimer = setTimeout(function() {
          wii.isEjecting = false;
          wii.toggleClass(
            wii.isEjecting, 'cd-drive', 'wii-box__ctrl--cd--eject'
          );
          wii.toggleProcessing();
          console.log('==== Wii eject complete ====');
        }, wii.processingTime);
      } else {
        wii.isEjecting = false;
        console.log('==== Wii are busy processing or have no power ====');
      }
    },

    /**
    * Reset event of Wii instance
    */
    reset: function() {
      var wii = this;
      if (wii.hasPower && !wii.isProcessing) {
        wii.isResetting = true;
        wii.toggleClass(
          wii.isResetting, 'cd-drive', 'wii-box__ctrl--cd--reset'
        );
        wii.toggleProcessing();
        // Wii turns off temporarily
        wii.togglePower();
        console.log('==== Wii are resetting ====');
        setTimeout(function() {
          // No longer resetting
          wii.isResetting = false;
          wii.toggleClass(
            wii.isResetting, 'cd-drive', 'wii-box__ctrl--cd--reset'
          );
          console.log('==== Wii reset complete ====');
        }, 300);

        window.clearTimeout(resetTimer);
        resetTimer = setTimeout(function() {
          wii.toggleProcessing();
          // Turn Wii On
          wii.togglePower();
        }, wii.processingTime);
      } else {
        wii.isResetting = false;
        console.log('==== Wii are busy processing or have no power ====');
      }
    },

    /**
    * Toggle processing state of Wii instance
    */
    toggleProcessing: function() {
      this.isProcessing = this.hasPower ? !this.isProcessing : false;
      this.toggleClass(this.isProcessing, 'processor', 'show');
      // Console Logs
      if (this.isProcessing) {
        console.log('==== Wii are processing ====');
      }
    },

    /**
    * Toggle given class on element, based on bool check
    * @param {bool} check - Check that is evaluated to determine add/remove class
    * @param {Object} element - Target element
    * @param {String} toggleClass - Name of class to add
    */
    toggleClass: function(check, element, toggleClass) {
      var el = document.getElementById(element);
      if (check) {
        el.classList.add(toggleClass);
      } else {
        el.classList.remove(toggleClass);
      }
    }
  };

  /**
  * Add Event Listeners
  */
  document.getElementById('btn-power').addEventListener('click', function() {
    myWii.togglePower();
  }, false);

  document.getElementById('btn-eject').addEventListener('click', function() {
    myWii.eject();
  }, false);

  document.getElementById('btn-reset').addEventListener('click', function() {
    myWii.reset();
  }, false);

  document.getElementById('btn-panel').addEventListener('click', function() {
    myWii.isHorizontal = !myWii.isHorizontal;
    myWii.toggleClass(myWii.isHorizontal, 'wii-container', 'side');
  }, false);

  /**
  * Window onload event, create new instance of Wii, fade in content
  */
  window.onload = function() {
    myWii = new Wii(false);
    myWii.toggleClass(true, 'wii-container', 'show');
    myWii.toggleClass(false, 'processor', 'show');
  };
})();

/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
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

  // Your custom JavaScript goes here
  var app = angular.module('goodJibesApp', ['angular-toArrayFilter', 'ngAnimate']);

  /*!
  *
  *  Directives
  *
  */

  // API Service directive
  app.factory('apiService', ['$http', function($http) {
    return {
      jobs: {
        get: function(callback, errorCallback) {
          $http.get('scripts/job-data.json', {
            cache: true
          }).then(callback, errorCallback);
        }
      }
    };
  }]);

  app.directive('ajaxLoader', ['$compile', function($compile) {
    return {
      restrict: 'A',
      link: function(scope, element, attr) {
        var template = '<div ng-hide="' + attr.ajaxLoader + '" class="loader" ><div class="loading-circles">' +
          '<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>' +
        '</div></div>';
        element.append($compile(template)(scope));
      }
    };
  }]);

  /*!
  *
  *  Controllers
  *
  */
  app.controller('jobsController', ['$scope', '$rootScope', 'apiService',
    function($scope, $rootScope, apiService) {
      $scope.success = false;
      $scope.apiError = false;
      $scope.results = {};
      $scope.sortOrder = 'id';

      /**
      * Get data from JSON file
      * @method getJobsData
      */
      $scope.getJobsData = function() {
        apiService.jobs.get(function(data) {
          $scope.initData(data);
          $scope.success = true;
        }, function() {
          $scope.apiError = true;
        });
      };

      /**
      * Populate Data callback on success
      * @method initData
      * @param {obj} data - data from JSON object
      */
      $scope.initData = function(data) {
        $scope.results = data.data;
      };

      /**
      * Sort Results by given field
      * @method sortBy
      * @param {string} cat - field to sort results by
      */
      $scope.sortBy = function(cat) {
        if (cat) {
          $scope.sortOrder = cat;
        }
      };
    }
  ]);
})();

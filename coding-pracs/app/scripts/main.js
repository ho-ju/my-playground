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
(function(win) {
    'use strict';

    // Your custom JavaScript goes here
    // Is Prime Number
    var isPrime = function(num) {
        var divider = 2;

        for (var i = 0; i <= num; i++) {
            if (num % divider === 0) {
                return false;
            } else {
                divider++;
            }
            return true;
        }
    };

    var getPrimeFactors = function(num) {

    };

    var removeCommonNumbers = function(arr) {
        var output = arr.filter(function(el, index, array) {
            return array.indexOf(el) === index;
        });
        console.log(output);
    };

    var mergeArray = function(arr1, arr2) {
        var mergedArr = [];
        if (arr1 && arr2) {
            for (var i = 0; i < arguments.length; i++) {
                for (var j = 0; j < arguments[i].length; j++) {
                    mergedArr.push(arguments[i][j]);
                }
            }

            mergedArr = mergedArr.sort(function(a, b) {
                return a - b; });

            console.log(mergedArr);
        }
    };

    var log = function() {
        console.log.apply(console, arguments);
    };

    // FIBONACI
    var startFibNum = function(num) {
        var fib = [0, 1]; // start array
        var startNextNum = 2;
        if (num <= 2) return 1;


        for (var i = startNextNum; i <= num; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        }

        log(fib[num]);
    };

    var numbers = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    // CUSTOM SORT
    //numbers.sort(function(a,b){
    //  return a-b;
    //}); -->
    log(numbers);

    // QUICKSORT
    function quickSort(data) {
        if (data.length < 1) {
            return [];
        }
        var left = [];
        var right = [];
        var pivot = data[0];

        for (var i = 1; i < data.length; i++) {
            if (data[i] < pivot) {
                left.push(data[i]);
            } else {
                right.push(data[i]);
            }
        }

        return [].concat(quickSort(left), pivot, quickSort(right));
    };

    log(quickSort(numbers));

    // Sort Array object
    var friends = [
        { name: 'John', age: 30 },
        { name: 'Ana', age: 20 },
        { name: 'Chris', age: 25 }
    ];

    function comparePerson(a, b) {
        if (a.age < b.age) {
            return -1;
        }
        if (a.age > b.age) {
            return 1;
        }
        return 0;
    };



    if (!win.isPrime) win.isPrime = isPrime;
    if (!win.removeCommonNumbers) win.removeCommonNumbers = removeCommonNumbers;
    if (!win.mergeArray) win.mergeArray = mergeArray;
})(window);

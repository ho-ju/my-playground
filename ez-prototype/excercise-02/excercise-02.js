var app = angular.module('myApp',[]);

app.controller('searchController', ["$scope", "$timeout", "$http", function($scope, $timeout, $http){
    $scope.formData = {};
    $scope.results = {};
    $scope.success = false;
    $scope.error = false;
    // Timeout Vars
    $scope.searchTimeout = {};
    $scope.delay = 500;
    // Paging Vars
    $scope.pageNo = 0;
    $scope.pageCount = 5;
    $scope.pageMax = 5;
    $scope.pageLimit = 0;
    $scope.pagedNames = [];
    $scope.otherCount = 0;
    // Data Vars
    $scope.letterDict = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7,
        i: 8,
        j: 9,
        k: 10,
        l: 11,
        m: 12,
        n: 13,
        o: 14,
        p: 15,
        q: 16,
        r: 17,
        s: 18,
        t: 19,
        u: 20,
        v: 21,
        w: 22,
        x: 23,
        y: 24,
        z: 25
    };
    $scope.xAxisVals = [];
    $scope.yAxisVals = "abcdefghijklmnopqrstuvwxyz".split('');

    /**
    * Initialising function, set canvas and axis values
    * @method init
    */
    $scope.init = function(){
        $scope.ctx = document.getElementById('graph').getContext('2d');
        $scope.yAxisVals.push("other");
        $scope.setInitYAxisVals();
    };

    /**
    * Initialising y axis values
    * @method setInitYAxisVals
    */
    $scope.setInitYAxisVals = function() {
        $scope.xAxisVals = []; // Clear x axis values
        for(var i=0; i<$scope.yAxisVals.length; i++) {
            $scope.xAxisVals.push(0);
        }
    };

    /**
    * Fetch Data from API
    * @method getData
    */
    $scope.getData = function() {
        $timeout.cancel($scope.searchTimeout); // Clear timeout so API is not abused
        $scope.searchTimeout = $timeout(function(){
            $http.get('https://api.github.com/search/users?q=' + $scope.formData.searchText).
                then(function(data){
                    $scope.results = data.data;
                    $scope.success = true;
                    $scope.pageLimit = $scope.results.items.length; // total_count field not accurate, only returns 30
                    $scope.getPagedNames();
                }, function(response) {
                    $scope.error = true;
            });
        }, $scope.delay);
    };

    /**
    * Get Usernames of data withinin page range
    * @method getPagedNames
    */
    $scope.getPagedNames = function() {
        $scope.pagedNames = [];
        for(var i=$scope.pageNo; i<$scope.pageMax; i++) {
            if(i < $scope.pageLimit && i > 0) {
                $scope.pagedNames.push($scope.results.items[i].login);
                $scope.nextDisabled = false;
                $scope.prevDisabled = false;
            } else if(i <= 0) { // No more Prev Items
                $scope.prevDisabled = true;
            } else { // No more Next items
                $scope.nextDisabled = true;
            }
        }
        $scope.countLetters();
    };

    /**
    * Store count of each occurance of each letter
    * @method countLetters
    */
    $scope.countLetters = function() {
        var currentLetter = "";
        var currentIndex = 0;
        var strippedName = "";
        var otherChars = "";

        for(var i=0; i<$scope.pagedNames.length; i++) {
            strippedName = $scope.pagedNames[i].replace(/[^A-Za-z]+/g, '').toLowerCase(); // remove unwanted chars
            otherChars = otherChars + $scope.pagedNames[i].replace(/[A-Za-z]+/g, ''); // Store other chars
            for(var j=0; j<strippedName.length; j++) {
                currentLetter = strippedName.charAt(j);
                var currIndex = $scope.letterDict[currentLetter];
                $scope.xAxisVals[currIndex]++; // Reference dictionary of letters and increase count
            }
        }

        $scope.xAxisVals[$scope.yAxisVals.length - 1] = otherChars.length;
        $scope.drawGraph();
    };

    /**
    * Draw Graph
    * @method drawGraph
    */
    $scope.drawGraph = function() {
        $scope.myChart = new Chart($scope.ctx, {
            type: 'bar',
            data: {
                labels: $scope.yAxisVals,
                datasets: [
                    {
                        data: $scope.xAxisVals,
                        backgroundColor: '#0f7e8e',
                        hoverBackgroundColor: '#343a40'
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                }
            }
        });
    };

    /**
    * Set Next Page
    * @method nextPage
    */
    $scope.nextPage = function() {
        $scope.setInitYAxisVals();
        $scope.myChart.destroy();
        $scope.pageNo = $scope.pageMax;
        $scope.pageMax = $scope.pageNo + $scope.pageCount;
        $scope.getPagedNames();
    };

    /**
    * Set Previous Page
    * @method nextPage
    */
    $scope.prevPage = function() {
        $scope.setInitYAxisVals();
        $scope.myChart.destroy();
        $scope.pageNo = $scope.pageNo - $scope.pageCount;
        $scope.pageMax = $scope.pageNo + $scope.pageCount;
        $scope.getPagedNames();
    };
}]);
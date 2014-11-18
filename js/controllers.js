(function(){
   var app = angular.module("SpeedySplit", [
      'timer'      
   ]);

   var time = function(timeString) {      
      return moment(timeString, 'm:ss.SSS');
   };

   var splitTimerController = function($scope) {

      $scope.timerRunning = false;
      $scope.splits = [
         { name: "Majula Bonfire", previousTime: time('2:37.000'), currentTime: "" },
         { name: "Forest Bonfire", previousTime: time('5:01.043'), currentTime: "" }
      ];
      var activeSplit = -1;
      var lastSplitTime = moment().subtract(5, 'seconds');

      $scope.currentSplit = function() {
         return $scope.splits[activeSplit + 1];
      };

      $scope.displayTime = function(time) {
         if (time === '') { return '--------'; }

         return time.format('m:ss.SSS');
      };

      var advanceTimer = function() {
         if ($scope.timerRunning) {
            nextSplit(); 
         }
         else {
            startTimer();
         }
      };

      var startTimer = function() {
         $scope.timerRunning = true;
         $scope.$broadcast('timer-start');         
      };

      var stopTimer = function() {
         $scope.timerRunning = false;
         $scope.$broadcast('timer-stop');         
      }      

      var nextSplit = function() {

         activeSplit += 1;

         // if this is the last split, then we should stop the timer
         if (activeSplit == $scope.splits.length) {
            stopTimer();
            return;
         }
         
         $scope.$broadcast('timer-poll');         
         console.log('nextSplit called');
      };

      var isBounce = function(time) {
         var now = moment();
         var bounce = !(lastSplitTime.add(500, 'milliseconds').isBefore(now));

         if (!bounce) {
            lastSplitTime = now;   
         }
         
         return bounce;
      };

      $scope.$on('space', function() {
         // a debounce guard
         if (isBounce()) { return; }
         
         console.log("split advanced");
         advanceTimer();
      });

      $scope.$on('timer-update', function(x, data) {
         var millis = data.millis % 1000;
         var timeStr = data.minutes + ":" + data.seconds + "." + millis;

         $scope.splits[activeSplit].currentTime = time(timeStr);

         console.log('timer-update called');

         $scope.$apply();
      });
   };

   var spacePressedController = function($scope, $document) {
      $document.bind('keypress', function(event) {
         if (event.which === 32) {
            $scope.$broadcast('space');
         }
      });
   };

   app.controller("SplitTimerController",
      ["$scope", splitTimerController]);
   app.controller("SpacePressedController",
      ["$scope", "$document", spacePressedController]);
})();
(function(){

   var module = angular.module("speedySplit.controllers", []);

   var time = function(timeString) {
      return moment(timeString, 'm:ss.SSS');
   };

   module.controller('NewSplitController', [ '$scope', 'splitTimer', function($scope, splitTimer) {

      $scope.newSplits = [
         { id: 0, name: '', previousTime: null, currentTime: null }
      ];
      $scope.numSplits = 1;      

      $scope.isValidSplit = function() {
         return false;
      };

      $scope.addSplit = function() {
         $scope.numSplits += 1;

         $scope.newSplits.push({
            id: $scope.numSplits, name: '', previousTime: null, currentTime: null
         });
      };

      $scope.finalizeSplit = function() {
         splitTimer.setSplits($scope.newSplits);
      };      
   }]);

   module.controller('SplitTimerController', [ '$scope', 'splitTimer', function($scope, splitTimer) {

      var timerRunning = false;
      var lastSplitTime = moment().subtract(5, 'seconds');

      $scope.splits = null;
      splitTimer.onSplitUpdate(function(split) {
         $scope.splits = split;
         console.log($scope.splits);
      });

      $scope.currentSplit = function() {
         return splitTimer.currentSplit();
      };

      // todo: consider making this a custom filter
      $scope.displayTime = function(time) {
         if (time === '' || time === null) { return '--------'; }

         return time.format('m:ss.SSS');
      };

      var advanceTimer = function() {
         if (!splitTimer.done()) {
            if (!timerRunning) {
               $scope.$broadcast('timer-start');
               timerRunning = true;
            } else {
               $scope.$broadcast('timer-poll');
            }
         }
      };

      var debounce = function() {
         var now = moment();
         var bounce = !(lastSplitTime.clone().
            add(1, 'second').isBefore(now));

         if (!bounce) {
            lastSplitTime = now;
         }

         return !bounce;
      };

      $scope.$on('space', function() {
         advanceTimer();
      });

      $scope.$on('timer-update', function(x, data) {
         // debounce filter
         if (!debounce()) { return; }

         var millis = data.millis % 1000;
         var timeStr = data.minutes + ":" + data.seconds + "." + millis;

         splitTimer.updateSplit(timeStr);

         if (splitTimer.done()) {
            $scope.$broadcast('timer-stop');
         }

         $scope.$apply();
      });
   }]);

   module.controller('SpacePressedController', [ '$scope', '$document',
      function($scope, $document) {

      $document.bind('keypress', function(event) {
         if (event.which === 32) {
            $scope.$broadcast('space');
         }
      });
   }]);
})();
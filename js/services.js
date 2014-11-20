(function() {

   var module = angular.module(
      'speedySplit.splitTimerService', []);

   module.factory('splitTimer', function() {

      var toTime = function(timeString) {
         return moment(timeString, 'm:ss.SSS');
      };

      var _splits = [
         { name: "Majula Bonfire", previousTime: toTime('2:37.000'), currentTime: "" },
         { name: "Forest Bonfire", previousTime: toTime('5:01.043'), currentTime: "" }
      ];

      var _timerRunning = false;
      var _currentSplit = 0;

      var setSplits = function(newSplit) {
         _splits = newSplit;
      };

      var getSplits = function() {
         return _splits;
      };

      var hasSplits = function() {
         return _splits != null;
      };

      var currentSplit = function() {
         return _splits[_currentSplit];
      };

      var done = function() {
         return _currentSplit >= _splits.length;
      };

      var updateSplit = function(time) {
         _splits[_currentSplit].currentTime = toTime(time);
         _currentSplit += 1;
      };

      return {
         hasSplits: hasSplits,
         setSplits: setSplits,
         getSplits: getSplits,
         currentSplit: currentSplit,
         updateSplit: updateSplit,
         done: done
      };

   });

})();
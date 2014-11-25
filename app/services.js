(function() {

   var module = angular.module(
      'speedySplit.splitTimerService', []);

   module.factory('splitTimer', function() {

      var _splits = null;
      var _timerRunning = false;
      var _currentSplit = 0;
      var splitCallbacks = [];

      var onSplitUpdate = function(callback) {
         splitCallbacks.push(callback);
      };

      var notifyListeners = function() {
         splitCallbacks.forEach(function(callback) {
            callback(_splits);
         });
      };

      var toTime = function(timeString) {
         return moment(timeString, 'm:ss.SSS');
      };     

      var currentSplit = function() {
         return _splits[_currentSplit];
      };

      var setSplits = function(newSplits) {
         _splits = newSplits;
         notifyListeners();
      };

      var getSplits = function() {
         return _splits;
      };

      var done = function() {
         return _splits === null 
                || _currentSplit >= _splits.length
      };

      var updateSplit = function(time) {
         _splits[_currentSplit].currentTime = toTime(time);
         _currentSplit += 1;   
      };

      return {
         setSplits: setSplits,
         getSplits: getSplits,
         currentSplit: currentSplit,
         updateSplit: updateSplit,
         done: done,
         onSplitUpdate: onSplitUpdate
      };

   });

})();
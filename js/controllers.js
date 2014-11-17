(function(){
   var app = angular.module("SpeedySplit", [
      'timer'      
   ]);

   var keypress = function(event) {
      console.log(event.which);
   };

   var splitTimerController = function($scope) {

      $scope.timerRunning = false;
      $scope.splits = [
         { name: "Majula Bonfire", previousTime: "2:37", currentTime: "" },
         { name: "Forest Bonfire", previousTime: "5:01", currentTime: "" }
      ];
      var activeSplit = 0;

      $scope.currentSplit = function() {
         return $scope.splits[activeSplit];
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

         console.log('timer started');
      };

      var stopTimer = function() {
         $scope.timerRunning = false;
         $scope.$broadcast('timer-stop');

         console.log('timer-stopped');
      }

      var nextSplit = function() {
         $scope.$broadcast('timer-poll')
      };

      $scope.$on('space', function() {
         advanceTimer();
      });

      $scope.$on('timer-update', function(x, data) {
         console.log(data);
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
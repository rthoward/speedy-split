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
         { name: "Majula Bonfire", time: "2:37" },
         { name: "Forest Bonfire", time: "5:01" }
      ];

      var toggleTimer = function() {
         if ($scope.timerRunning) {
            stopTimer(); 
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

      $scope.$on('space', function() {
         toggleTimer();
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
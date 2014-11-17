(function(){
   var app = angular.module("SpeedySplit", [
      'timer'      
   ]);

   var keypress = function(event) {
      console.log(event.which);
   };

   var splitTimerController = function($scope) {

      $scope.splits = [
         { name: "Majula Bonfire", time: "1:00" }
      ];

      $scope.$on('space', function() {
         console.log("space hit");
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
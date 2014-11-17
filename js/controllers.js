(function(){
   var app = angular.module("SpeedySplit", [
      'timer'      
   ]);

   var splitTimerController = function($scope) {

      $scope.splits = [
         { name: "Majula Bonfire", time: "1:00" }
      ];

      console.log("hello world");

      $scope.pressed = function() {
         console.log("space pressed");
      };
   };

   app.controller("SplitTimerController",
      ["$scope", splitTimerController]);
})();
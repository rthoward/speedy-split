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
     
   };

   app.controller("SplitTimerController",
      ["$scope", splitTimerController]);  

})();
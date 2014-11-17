(function(){
   var app = angular.module("SpeedySplit", [

   ]);

   var splitTimerController = function($scope) {
      console.log("hello world");
   };

   app.controller("SplitTimerController",
      ["$scope", splitTimerController]);
})();
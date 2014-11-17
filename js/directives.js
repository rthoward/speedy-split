app.directive('ngSpace', function() {
   return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
         console.log("key pressed: " + event.which);

         event.preventDefault();
      });
   };
});
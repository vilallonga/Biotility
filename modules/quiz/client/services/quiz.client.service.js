'use strict';


//Articles service used for communicating with the articles REST endpoints
angular.module('quiz').factory('Quiz', ['$resource',
  function ($resource) {
    return $resource('api/quiz/',  {
      create: {
        method: 'POST'
      }
    });
  }
]);

// myModule.factory('Items', ['$http', function($http){
//   var Url   = "src/utils/some.csv";
//   var Items = $http.get(Url).then(function(response){
//      return csvParser(response.data);
//   });
//   return Items;
// }]);

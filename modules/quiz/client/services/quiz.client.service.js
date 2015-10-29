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

'use strict';


//Articles service used for communicating with the articles REST endpoints
angular.module('quiz').factory('QuizQuestion', ['$resource',
  function ($resource) {
    return $resource('api/quiz/',  {
	}, {    	
		getQuestions: {
		method: 'GET',
		url:'/api/question_upload',
		isArray: true
		}
	});
  }
]);

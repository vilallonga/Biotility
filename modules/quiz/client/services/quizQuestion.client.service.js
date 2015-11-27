'use strict';


//Articles service used for communicating with the articles REST endpoints
angular.module('quiz').factory('QuizQuestion', ['$resource',
  function ($resource) {
  	return $resource('api/quiz/',  {
	}, {    	

//    return $resource('api/quiz/:category',  {
//    	category : 'subjectObj'
// }, {    	
		getQuestions: {
			method: 'GET',
			url:'/api/quiz',
			isArray: true, 
		},
		updateScore: {
			method: 'PUT',
			url: '/api/quiz_result'
		}
	});
  }
]);

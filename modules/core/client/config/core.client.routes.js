'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'modules/core/client/views/home.client.view.html'
    })
    .state('subject',{
      url:'/{courseName:[a-zA-Z]+}',
      templateUrl: 'modules/core/client/views/subject.client.view.html'
    })
    .state('subject.quiz',{
      url: '/quizTemplate',
      templateUrl: 'modules/core/client/views/quizTemplate.client.view.html'
    })
    .state('subject.quiz.quiz-results',{
      url:'/quizResults',
      templateUrl: 'modules/core/client/views/quizResults.client.view.html'
    })
     .state('subject.resources', {
      url: '/resources',
      templateUrl: 'modules/core/client/views/resources.client.view.html'
    })
    .state('bad-request', {
      url: '/bad-request',
      templateUrl: 'modules/core/client/views/400.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'modules/core/client/views/404.client.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('forbidden', {
      url: '/forbidden',
      templateUrl: 'modules/core/client/views/403.client.view.html',
      data: {
        ignoreState: true
      }
    });
  }
]);

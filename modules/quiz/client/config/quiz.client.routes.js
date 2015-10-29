'use strict';

// Setting up route
angular.module('quiz').config(['$stateProvider',
  function ($stateProvider) {
    //Quiz state routing

    $stateProvider
        .state('quiz_sample', {
            url: '/quiz_sample',
            templateUrl: 'modules/quiz/client/views/quizTemplate.client.view.html'
        })
        .state('quiz_test', {
            url: '/quiz_test',
            templateUrl: 'modules/quiz/client/views/quizTest.client.view.html'
        });
    // Articles state routing
    // $stateProvider
    //   .state('articles', {
    //     abstract: true,
    //     url: '/articles',
    //     template: '<ui-view/>'
    //   })
    //   .state('articles.list', {
    //     url: '',
    //     templateUrl: 'modules/quiz/client/views/list-articles.client.view.html'
    //   })
    //   .state('articles.create', {
    //     url: '/create',
    //     templateUrl: 'modules/quiz/client/views/create-article.client.view.html',
    //     data: {
    //       roles: ['user', 'admin']
    //     }
    //   })
    //   .state('articles.view', {
    //     url: '/:articleId',
    //     templateUrl: 'modules/quiz/client/views/view-article.client.view.html'
    //   })
    //   .state('articles.edit', {
    //     url: '/:articleId/edit',
    //     templateUrl: 'modules/quiz/client/views/edit-article.client.view.html',
    //     data: {
    //       roles: ['user', 'admin']
    //     }
    //   });
  }
]);

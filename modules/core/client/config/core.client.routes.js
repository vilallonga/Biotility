'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise(function($injector, $location) {
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
            .state('quiz', {
                url: '/{courseName:.+}/quiz',
                templateUrl: 'modules/quiz/client/views/quizTemplate.client.view.html'
            })
            .state('quiz.results', {
                url: '/results',
                templateUrl: 'modules/quiz/client/views/quizResults.client.view.html'
            })
            .state('resources', {
                url: '/{courseName:.+}/resources',
                templateUrl: 'modules/core/client/views/resources.client.view.html'
            })
            .state('question_upload', {
                url: '/question_upload',
                templateUrl: 'modules/quiz/client/views/quizTest.client.view.html'
            })
            .state('studentprofile', {
                url: '/student/{userName:.+}',
                templateUrl: 'modules/core/client/views/profile.client.view.html'
            })
            .state('teacherprofile', {
                url: '/teacher/{userName:.+}',
                templateUrl: 'modules/core/client/views/profile.client.view.html'
            })
            .state('studentData', {
                url: '/data/students',
                templateUrl: 'modules/core/client/views/data.students.client.view.html'
            })
            .state('teacherData', {
                url: '/data/teachers',
                templateUrl: 'modules/core/client/views/data.teachers.client.view.html'
            })

            .state('studentList',{
                url: '/teacher/{userName:.+}',
                templateUrl: 'modules/core/client/views/studentList.client.view.html'
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

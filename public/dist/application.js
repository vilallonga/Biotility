'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'mean';
  var applicationModuleVendorDependencies = ['ngResource', 'ngAnimate', 'ngMessages', 'ui.router', 'ui.bootstrap', 'ui.utils', 'angularFileUpload'];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', '$httpProvider',
  function ($locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $httpProvider.interceptors.push('authInterceptor');
  }
]);

angular.module(ApplicationConfiguration.applicationModuleName).run(["$rootScope", "$state", "Authentication", function ($rootScope, $state, Authentication) {

  // Check authentication before changing state
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data && toState.data.roles && toState.data.roles.length > 0) {
      var allowed = false;
      toState.data.roles.forEach(function (role) {
        if (Authentication.user.roles !== undefined && Authentication.user.roles.indexOf(role) !== -1) {
          allowed = true;
          return true;
        }
      });

      if (!allowed) {
        event.preventDefault();
        if (Authentication.user !== undefined && typeof Authentication.user === 'object') {
          $state.go('forbidden');
        } else {
          $state.go('authentication.signin');
        }
      }
    }
  });

  // Record previous state
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    if (!fromState.data || !fromState.data.ignoreState) {
      $state.previous = {
        state: fromState,
        params: fromParams,
        href: $state.href(fromState, fromParams)
      };
    }
  });
}]);

//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});

'use strict';

// Use Applicaion configuration module to register a new module
//console.log("Core Ran here");
ApplicationConfiguration.registerModule('core');
ApplicationConfiguration.registerModule('core.admin', ['core']);
ApplicationConfiguration.registerModule('core.admin.routes', ['ui.router']);

//register module for quiz is ran twice, had an error where quiz.client.module didn't work but left it there for sake of clarity
ApplicationConfiguration.registerModule('quiz');

'use strict';

// Use Applicaion configuration module to register a new module
//For whatever reason this doesn't work... Added ApplicationConfiguration.registerModule('quiz'); to the core.client.js file
ApplicationConfiguration.registerModule('quiz');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users', ['core']);
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);

'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        data: {
          roles: ['admin']
        }
      });
  }
]);

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
        templateUrl: 'modules/quiz/client/views/quizResults.client.view.html',
        params: {
          correctScore: null,
          numQuestion: null,
        }
      })
      .state('resources', {
        url: '/{courseName:.+}/resources',
        templateUrl: 'modules/core/client/views/resources.client.view.html'
      })
      .state('question_upload', {
        url: '/question_upload',
        templateUrl: 'modules/quiz/client/views/quizUpload.client.view.html'
      })
      .state('studentprofile', {
        url: '/student/{userName:.+}',
        templateUrl: 'modules/core/client/views/profile.client.view.html'
      })
      .state('teacherprofile', {
        url: '/teacher/{userName:.+}',
        templateUrl: 'modules/core/client/views/profile.client.view.html'
      })
      .state('userData', {
        url: '/data/users',
        templateUrl: 'modules/core/client/views/data.users.client.view.html'
      })
      .state('questionData', {
        url: '/data/questions',
        templateUrl: 'modules/core/client/views/data.questions.client.view.html'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'modules/core/client/views/about.client.view.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'modules/core/client/views/contact.client.view.html'
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

'use strict';


angular.module('core').controller('UserData', ['$scope', '$http',
    function($scope, $http) {
      $http.get('/api/data/users')
      .success(function(res){
      	$scope.data = res;
      });
  }
]);

angular.module('core').controller('QuestionData', ['$scope', '$http',
    function($scope, $http) {
      $http.get('/api/data/questions')
      .success(function(res){
      	$scope.data = res;
      });
  }
]);

angular.module('core').controller('SubjectData', ['$scope', '$http',
    function($scope, $http) {
      $http.get('/api/parse/subjects')
      .success(function(res){
      	$scope.data = res;
      });
  }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$location', 'Authentication', 'NavCrumbs',
  function($scope, $state, $location, Authentication, NavCrumbs) {
    // Expose view variables
    $scope.$state = $state;
    $scope.authentication = Authentication;

    // Array of page changes for breadcrumb recall
    $scope.breadcrumb = NavCrumbs.breadcrumb;

    // On breadcrumb clicked
    $scope.click = function(crumb) {
      $location.url(crumb.url);
    };

    // Go to profile
    $scope.profile = function() {

      // routing depending on profile type
      if ($scope.authentication.user.profileType === 'Teacher') {
        $location.url('/teacher/' + $scope.authentication.user.userName);
      } else {
        $location.url('/student/' + $scope.authentication.user.userName);

      }
    };

    // logout: set current auth user to null
    $scope.logout = function() {
      $scope.authentication.user = null;
      $location.url('/');
    };

  }
]);

'use strict';

/** SEE core.server.routes.js  */

angular.module('core').controller('MainController', ['$scope', '$state', '$location', 'Authentication', 'Subjects',
    function($scope, $state, $location, Authentication, Subjects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        Subjects.loadSubjects().then(function(response) {
          $scope.subjects = response.data;
        });

        $scope.gotoQuiz = function(subjectObj) {
            $location.path('/' + subjectObj.name + '/quiz');
        };

        $scope.gotoResource = function(subjectObj) {
            $location.path('/' + subjectObj.name + '/resources');
        };

    }
]);

angular.module('core').controller('SubjectController', ['$scope', '$state', '$location', 'Authentication', '$stateParams',
    function($scope, $state, $location, Authentication, $stateParams) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.subject = $stateParams.courseName;

    }
]);

angular.module('core').controller('ProfileController', ['$scope', '$state', '$location', 'Authentication',
    function ($scope, $state, $location, Authentication) {

        $scope.authentication = Authentication;
        $scope.user = $scope.authentication.user;

        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Cells',
                content: 'Lesson 4: The Nucleus',
                progress: 60
            },
            {
                title: 'Biology',
                content: 'Lesson 2: Ecosystems',
                progress: 25
            },
            {
                title: 'Chemistry',
                content: 'Lesson 13: Electron Mobility',
                progress: 75
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];


        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }
]);

'use strict';

/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('core')
  .directive('showErrors', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
    var linkFn = function (scope, el, attrs, formCtrl) {
      var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
        initCheck = false,
        showValidationMessages = false,
        blurred = false;

      options = scope.$eval(attrs.showErrors) || {};
      showSuccess = options.showSuccess || false;
      inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
      inputNgEl = angular.element(inputEl);
      inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

      if (!inputName) {
        throw 'show-errors element has no child input elements with a \'name\' attribute class';
      }

      var reset = function () {
        return $timeout(function () {
          el.removeClass('has-error');
          el.removeClass('has-success');
          showValidationMessages = false;
        }, 0, false);
      };

      scope.$watch(function () {
        return formCtrl[inputName] && formCtrl[inputName].$invalid;
      }, function (invalid) {
        return toggleClasses(invalid);
      });

      scope.$on('show-errors-check-validity', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          initCheck = true;
          showValidationMessages = true;

          return toggleClasses(formCtrl[inputName].$invalid);
        }
      });

      scope.$on('show-errors-reset', function (event, name) {
        if (angular.isUndefined(name) || formCtrl.$name === name) {
          return reset();
        }
      });

      toggleClasses = function (invalid) {
        el.toggleClass('has-error', showValidationMessages && invalid);
        if (showSuccess) {
          return el.toggleClass('has-success', showValidationMessages && !invalid);
        }
      };
    };

    return {
      restrict: 'A',
      require: '^form',
      compile: function (elem, attrs) {
        if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
          if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
            throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
          }
        }
        return linkFn;
      }
    };
}]);

angular.module('quiz').directive('readCSVFile', ["$parse", function ($parse) {
  console.log("hello");
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();
                
        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        };

        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
}]);





'use strict';

angular.module('core').factory('authInterceptor', ['$q', '$injector',
  function ($q, $injector) {
    return {
      responseError: function(rejection) {
        if (!rejection.config.ignoreAuthModule) {
          switch (rejection.status) {
            case 401:
              $injector.get('$state').transitionTo('authentication.signin');
              break;
            case 403:
              $injector.get('$state').transitionTo('forbidden');
              break;
          }
        }
        // otherwise, default behaviour
        return $q.reject(rejection);
      }
    };
  }
]);

'use strict';

// Main service for holding persistent data
angular.module('core').service('Subjects', ['$http', function($http) {

  // Array of the subjects we have.
  // 	{
  // 		name: "Cells",
  // 		img: "modules/core/client/img/subject_icons/cells.png",
  // 		description: "Cells (general), Cell Structures and Organelles, Photosynthesis"
  // 	},
  // 	{
  // 		name: "Chemistry & Biochemistry",
  // 		img: "modules/core/client/img/subject_icons/chemistry.png",
  // 		description: "Chemicals are cool."
  // 	},
  // 	{
  // 		name: "Genetics",
  // 		img: "modules/core/client/img/subject_icons/genetics.png",
  // 		description: "GENES GENES GENES GENES GENES GENES"
  // 	},
  // 	{
  // 		name: "Laboratory Skills and Applications",
  // 		img: "modules/core/client/img/subject_icons/lab.png",
  // 		description: "Lab Lab Lab"
  // 	},
  // 	{
  // 		name: "Research and Scientific Method",
  // 		img: "modules/core/client/img/subject_icons/research.png",
  // 		description: "Research is Cool"
  // 	},
  // {
  // 		name: "General Topics",
  // 		img: "modules/core/client/img/subject_icons/general.jpg",
  // 		description: "I love generalized topics"
  // 	},
  // {
  // 		name: "Applied Mathematics",
  // 		img: "modules/core/client/img/subject_icons/math.jpg",
  // 		description: "Yay math"
  // 	},
  // {
  // 		name: "Biotechnology Skills",
  // 		img: "modules/core/client/img/subject_icons/skills.jpg",
  // 		description: "Mad skillz"
  // 	},
  // {
  // 		name: "Laboratory Equipment",
  // 		img: "modules/core/client/img/subject_icons/equip.jpg",
  // 		description: "centrifuge!"
  // 	},
  // {
  // 		name: "Preparing Solutions",
  // 		img: "modules/core/client/img/subject_icons/solution.png",
  // 		description: "Mix it up"
  // 	},
  // {
  // 		name: "Workplace Safety and Behavior",
  // 		img: "modules/core/client/img/subject_icons/work.png",
  // 		description: "Be professional."
  // 	}
  //

  // Array for question objects we have for the selected subject.
  this.questionsForSubject = [{}];

  // Load questions of a subject into the questions array.
  this.loadQuestions = function() {
    $http({
      method: 'GET',
      url: '/api/question-data/' // ADD subject name var
    }).success(function(res) {

    });
  };

  // A subject was clicked, time to parse the question data we need,
  // while the user is taken to the pre-quiz page.
  this.subjectClicked = function(subject) {
    var subjectName = this.getSubjectByName(subject);
    this.questionsForSubject = this.loadQuestions();
  };

  // Return a subject whose name is equal to the given name.
  this.getSubjectByName = function(subjectName) {

    this.subjects.forEach(function(elem, index, array) {
      if (elem.name === subjectName)
        return elem;
    });

    return null;
  };

  return {
    loadSubjects: function() {
      return $http({
        method: 'GET',
        url: '/api/parse/subjects'
      });
    }
  };

}]);

angular.module('core').service('NavCrumbs', [
  function() {
    this.breadcrumb = [{
      name: "Home",
      url: "/"
    }];
  }
]);

'use strict';

// Create the Socket.io wrapper service
angular.module('core').service('Socket', ['Authentication', '$state', '$timeout',
  function (Authentication, $state, $timeout) {
    // Connect to Socket.io server
    this.connect = function () {
      // Connect only when authenticated
      if (Authentication.user) {
        this.socket = io();
      }
    };
    this.connect();

    // Wrap the Socket.io 'on' method
    this.on = function (eventName, callback) {
      if (this.socket) {
        this.socket.on(eventName, function (data) {
          $timeout(function () {
            callback(data);
          });
        });
      }
    };

    // Wrap the Socket.io 'emit' method
    this.emit = function (eventName, data) {
      if (this.socket) {
        this.socket.emit(eventName, data);
      }
    };

    // Wrap the Socket.io 'removeListener' method
    this.removeListener = function (eventName) {
      if (this.socket) {
        this.socket.removeListener(eventName);
      }
    };
  }
]);

'use strict';

// Configuring the Articles module
// angular.module('articles').run(['Menus',
//   function (Menus) {
//     // Add the articles dropdown item
//     Menus.addMenuItem('topbar', {
//       title: 'Articles',
//       state: 'articles',
//       type: 'dropdown',
//       roles: ['*']
//     });

//     // Add the dropdown list item
//     Menus.addSubMenuItem('topbar', 'articles', {
//       title: 'List Articles',
//       state: 'articles.list'
//     });

//     // Add the dropdown create item
//     Menus.addSubMenuItem('topbar', 'articles', {
//       title: 'Create Articles',
//       state: 'articles.create',
//       roles: ['user']
//     });
//   }
// ]);

'use strict';

// Setting up route
angular.module('quiz').config(['$stateProvider',
  function ($stateProvider) {
    //Quiz state routing

    // $stateProvider
    //     .state('quiz_sample', {
    //         url: '/quiz_sample',
    //         templateUrl: 'modules/quiz/client/views/quizTemplate.client.view.html'
    //     })
    //     .state('quiz_test', {
    //         url: '/quiz_test',
    //         templateUrl: 'modules/quiz/client/views/quizTest.client.view.html'
    //     });
  }
]);

'use strict';

// Quiz main controller
angular.module('quiz').controller('QuizController', ['$scope', 'QuizQuestion', '$stateParams', '$state', '$http',
  function($scope, QuizQuestion, $stateParams, $state, $http) {
    $scope.isDone = false; //checks if the quiz is finished ->switches models to done state
    $scope.isStart = false; //checks if quiz start button is triggered

    $scope.questions = [];
    var max = null;
    $scope.isMultipleChoice = false;
    $scope.index = -1;
    $scope.score = 0;
    $scope.numQuestion = 0;

    var currCategory = $stateParams.courseName;

    $scope.start = function() {
      $scope.isStart = true;
      $scope.increment();
      max = $scope.questions.length - 1; // (Index of array starts as 0)
    };

    $scope.checkAnswer = function(answer) {
      console.log("Check answer");
      if ($scope.questions[$scope.index].correctAnswer === answer) {
        $scope.score++;
      }
      $scope.increment();
    };

    $scope.increment = function() {
      //Preparing next question
      if ($scope.index === max) {
        console.log("Done");
        $scope.isDone = true;
        $scope.isStart = false;
      } else {
        $scope.index = ($scope.index + 1) % $scope.questions.length;

        if ($scope.questions[$scope.index].questionType === "TF") {
          $scope.isMultipleChoice = false;
        } else {
          $scope.isMultipleChoice = true;
        }
        $scope.numQuestion++;
        console.log("Max index is " + max);
        console.log("Index is " + $scope.index);
        console.log("Score is " + $scope.score);
      }


    };

    $scope.getQuestion = function() {
      $http.get('/api/quiz', {params: {"category": $stateParams.courseName} }).then(
        function(listOfQuestions) { //Checks to see if the value is correctly returned before printing out the console.
          console.log(listOfQuestions.data);
          $scope.questions = listOfQuestions.data;
        });
    };

    //console.log("Category before the switch to applications: " + currCategory);

  } //End of function for controller
]);

/*
Controller for the finished quiz results
*/
angular.module('quiz').controller('QuizResults', ['$scope', '$stateParams',
  function($scope, $stateParams) {
    console.log($stateParams.correctScore);
    $scope.score = $stateParams.correctScore;
    $scope.totalNumQuestion = $stateParams.numQuestion;
  }
]);


/*
* Controller for storing quiz into MongoDB
*/
angular.module('quiz').controller('QuizCreate', ['$scope', 'QuizQuestion',
  function($scope, QuizQuestion) {
    $scope.uploadQuestions = function($fileContent) {
      //console.log("Show content");
      var fileText = $fileContent;
      var rows = fileText.split('\n');
      var obj = [];
      angular.forEach(rows, function(val) {
        var o = val.split(',');
        if (o[0] !== 'Category') { //sketchy way to get rid of first row
          console.log(o);
          var quizQuestion;
          if (o[1] === 'TF') {
            quizQuestion = new QuizQuestion({
              category: o[0],
              questionType: o[1],
              description: o[2],
              correctAnswer: o[3]
            });
          } else {
            quizQuestion = new QuizQuestion({
              category: o[0],
              questionType: o[1],
              description: o[2],
              correctAnswer: o[3],
              answerDesc1: o[4],
              answerDesc2: o[5],
              answerDesc3: o[6],
              answerDesc4: o[7]
            });
          }
          obj = quizQuestion;
          quizQuestion.$save(function(response) {
            console.log("save done");
          }, function(errorResponse) {
            console.log("Error occured" + errorResponse.data.message);
          });
        } //End category if
      });

      $scope.content = obj;
    };

  }
]);

'use strict';
//Directive used to return data in json

angular.module('quiz').directive('onReadCsv', ["$parse", function ($parse) {
	return {
		restrict: 'A',
		scope: false,
		link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadCsv);
           // console.log("Element is" + element[0]);
			element.on('change', function(onChangeEvent) {
				var reader = new FileReader();
				reader.onload = function(onLoadEvent) {
					scope.$apply(function() {
						fn(scope, {$fileContent:onLoadEvent.target.result});
					});
				};
				reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
			});
		}
	};
}]);



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

'use strict';

// Setting up route
angular.module('users.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController'
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        resolve: {
          userResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              userId: $stateParams.userId
            });
          }]
        }
      });
  }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);

'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
  function($stateProvider) {
    // Users state routing
    $stateProvider
      .state('settings', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('settings.profile', {
        url: '/profile',
        templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
      })
      .state('settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
      })
      .state('settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
      })
      .state('settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html'
      })
      .state('authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
      })
      .state('authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
      })
      .state('authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
      })
      .state('studentList', {
        url: '/list',
        templateUrl: 'modules/users/client/views/studentlist.client.view.html'
      })
      .state('password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
      })
      .state('password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html'
      })
      .state('password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html'
      })
      .state('password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html'
      });
  }
]);

'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin',
  function ($scope, $filter, Admin) {
    Admin.query(function (data) {
      $scope.users = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);

'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve',
  function ($scope, $state, Authentication, userResolve) {
    $scope.authentication = Authentication;
    $scope.user = userResolve;

    $scope.remove = function (user) {
      if (confirm('Are you sure you want to delete this user?')) {
        if (user) {
          user.$remove();

          $scope.users.splice($scope.users.indexOf(user), 1);
        } else {
          $scope.user.$remove(function () {
            $state.go('admin.users');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = $scope.user;

      user.$update(function () {
        $state.go('admin.user', {
          userId: user._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'PasswordValidator', 'Authentication', 'Subjects',
  function($scope, $state, $http, $location, $window, PasswordValidator, Authentication, Subjects) {

    //Added Stuff
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;

    // credentials object
    $scope.credentials = {};
    $scope.credentials.coursesTeaching = [];

    // array of class names
    $scope.classNames = [];

    // load subjects
    Subjects.loadSubjects().then(function(response) {
      $scope.subjects = response.data;

      // grab all the courses, and read their names.
      for (var i = 0; i < $scope.subjects.length; i++) {
        $scope.classNames.push($scope.subjects[i].name);
      }

    });

    $scope.add = function(course) {
      if (course !== '') {
        $scope.credentials.coursesTeaching.push(course);
      }

      $scope.toAdd = '';
    };

    $scope.signup = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      // Add displayName
      $scope.credentials.displayName = $scope.credentials.lastName + ', ' + $scope.credentials.firstName;

      console.log($scope.credentials);

      $http.post('/api/auth/signup', $scope.credentials).success(function(response) {

        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the home page
        $location.url('/');

      }).error(function(response) {
        $scope.error = response.message;
        console.log(response);
      });
    };

    $scope.signin = function(isValid) {

      $scope.error = null;

      if (!isValid) {
        //$scope.$broadcast('show-errors-check-validity', 'userForm');
        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function(response) {

        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to home page
        $state.go('home');
      }).error(function(response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };
  }
]);

'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication', 'PasswordValidator',
  function ($scope, $stateParams, $http, $location, Authentication, PasswordValidator) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    //If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    // Submit forgotten password account id
    $scope.askForPasswordReset = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'forgotPasswordForm');

        return false;
      }

      $http.post('/api/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;

      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };

    // Change user password
    $scope.resetUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'resetPasswordForm');

        return false;
      }

      $http.post('/api/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;

        // Attach user profile
        Authentication.user = response;

        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

//controler for teacher page retrieval of students
angular.module('users').controller('StudentListController', ['$scope', '$state', '$location', '$filter', '$http',
    function($scope, $state, $location, $filter, $http) {
        $http.get('/api/data/students')
        .then(function(response) {
            $scope.data = response.data;
        });
    }
]);

'use strict';

angular.module('users').controller('ChangePasswordController', ['$scope', '$http', 'Authentication', 'PasswordValidator',
  function ($scope, $http, Authentication, PasswordValidator) {
    $scope.user = Authentication.user;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();

    // Change user password
    $scope.changeUserPassword = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'passwordForm');

        return false;
      }

      $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.$broadcast('show-errors-reset', 'passwordForm');
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('ChangeProfilePictureController', ['$scope', '$timeout', '$window', 'Authentication', 'FileUploader',
  function ($scope, $timeout, $window, Authentication, FileUploader) {
    $scope.user = Authentication.user;
    $scope.imageURL = $scope.user.profileImageURL;

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/users/picture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.user = Authentication.user = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = $scope.user.profileImageURL;
    };
  }
]);

'use strict';

angular.module('users').controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;

    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      $scope.success = $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      var user = new Users($scope.user);

      user.$update(function (response) {
        $scope.$broadcast('show-errors-reset', 'userForm');

        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);

'use strict';

angular.module('users').controller('SettingsController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    $scope.user = Authentication.user;
  }
]);

'use strict';

angular.module('users')
  .directive('passwordValidator', ['PasswordValidator', function(PasswordValidator) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.unshift(function (password) {
          var result = PasswordValidator.getResult(password);
          var strengthIdx = 0;

          // Strength Meter - visual indicator for users
          var strengthMeter = [
            { color: "danger", progress: "20" },
            { color: "warning", progress: "40"},
            { color: "info", progress: "60"},
            { color: "primary", progress: "80"},
            { color: "success", progress: "100"}
          ];
          var strengthMax = strengthMeter.length;

          if (result.errors.length < strengthMeter.length) {
            strengthIdx = strengthMeter.length - result.errors.length - 1;
          }

          scope.strengthColor = strengthMeter[strengthIdx].color;
          scope.strengthProgress = strengthMeter[strengthIdx].progress;

          if (result.errors.length) {
            scope.popoverMsg = PasswordValidator.getPopoverMsg();
            scope.passwordErrors = result.errors;
            modelCtrl.$setValidity('strength', false);
            return undefined;
          } else {
            scope.popoverMsg = '';
            modelCtrl.$setValidity('strength', true);
            return password;
          }
        });
      }
    };
}]);

'use strict';

angular.module('users')
  .directive("passwordVerify", function() {
    return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, modelCtrl) {
        scope.$watch(function() {
          var combined;
          if (scope.passwordVerify || modelCtrl.$viewValue) {
            combined = scope.passwordVerify + '_' + modelCtrl.$viewValue;
          }
          return combined;
        }, function(value) {
          if (value) {
            modelCtrl.$parsers.unshift(function(viewValue) {
              var origin = scope.passwordVerify;
              if (origin !== viewValue) {
                modelCtrl.$setValidity("passwordVerify", false);
                return undefined;
              } else {
                modelCtrl.$setValidity("passwordVerify", true);
                return viewValue;
              }
            });
          }
        });
     }
    };
});

'use strict';

// Users directive used to force lowercase input
angular.module('users').directive('lowercase', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function (input) {
        return input ? input.toLowerCase() : '';
      });
      element.css('text-transform', 'lowercase');
    }
  };
});

'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user
    };

    return auth;
  }
]);

'use strict';

// PasswordValidator service used for testing the password strength
angular.module('users').factory('PasswordValidator', ['$window',
  function ($window) {
    var owaspPasswordStrengthTest = $window.owaspPasswordStrengthTest;

    return {
      getResult: function (password) {
        var result = owaspPasswordStrengthTest.test(password);
        return result;
      },
      getPopoverMsg: function () {
        var popoverMsg = "Please enter a passphrase or password with greater than 10 characters, numbers, lowercase, upppercase, and special characters.";
        return popoverMsg;
      }
    };
  }
]);

'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
  function ($resource) {
    return $resource('api/users', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Users service
angular.module('users.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/users/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

'use strict';

/** SEE core.server.routes.js  */

angular.module('core').controller('MainController', ['$scope', '$state', '$location', 'Authentication', 'Subjects',
    function($scope, $state, $location, Authentication, Subjects) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        Subjects.loadSubjects().then(function(response) {
          $scope.subjects = response.data;
            console.log($scope.subjects);
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

		$scope.startQuiz = function(){
			$location.path('/' + $scope.subject + '/quiz');
		};

    }
]);

angular.module('core').controller('ProfileController', ['$scope', '$state', '$location', 'Authentication', '$http',
    function ($scope, $state, $location, Authentication, $http) {

        // authentication of user
        $scope.authentication = Authentication;
        $scope.user = $scope.authentication.user;

        console.log($scope.user);

        // accodian view one open - rest closed
        $scope.oneAtATime = true;
        $scope.isTeacher = false;
        $scope.profileVisible = true;

        // for teacher view
        if ($scope.profileType === "Teacher") {
            $scope.isTeacher = true;
        }

        // dummy data. backend still not up. cant link students to courses 
        $scope.groups = [
            {
                title: 'Cells',
                content: 'Quiz 1: The Nucleus',
                progress: 0
            },
            {
                title: 'Biology',
                content: 'Quiz 2: Ecosystems',
                progress: 25
            },
            {
                title: 'Genetics',
                content: 'Quiz 3: DNA',
                progress: 35
            },
            {
                title: 'Chemistry',
                content: 'Quiz 4: Electron Mobility',
                progress: 75
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

        $scope.$on('creation', function(event, args) {
            console.log(args);
            console.log("controller2");
            $scope.test = "TESTING";
            console.log($scope.section);
            $scope.section = args.firstName;
            console.log($scope.section);

        });

        $scope.studentGrades = [];
        $http.get('/api/quiz_result')
          .success(function(res) {
            console.log("quiz result: ", res);
            byStudent(res);
          });

        var byStudent = function(allStudentGrades) {
            for (var i = 0 ; i < allStudentGrades.length; i++) {
                console.log(allStudentGrades[i].studentName);
                console.log($scope.user.userName);
                console.log("BANG: " + allStudentGrades[i].studentName + " " + $scope.user.userName);
                if (allStudentGrades[i].studentName === $scope.user.userName) {
                    $scope.studentGrades.push(allStudentGrades[i]);
                    //TODO: "Applications" should be the name of the course, like "Biology"
                    //TODO: quiz should have a pass/fail variable, to determine if adding to progress.
                    /*
                    for (var j = 0; j < $scope.groups.length; j++) {
                        if (allStudentGrades[i].category === $scope.groups[j].title) {
                            if (allStudentGrades[i].pass == true) {
                                //add progress to group
                            }
                        }
                    }
                    */
                    if (allStudentGrades[i].category === "Applications") {
                        //have to hardcode this until what "applications" is, is resolved
                        $scope.groups[0].progress++;
                        //TODO: this should be:
                        /* if (allStudentGrades[i].pass == true) { */
                    }
                }
             //console.log($scope.studentGrades[i].studentName);

            }
            $scope.groups[0].progress *= 25;
        };

    }
]);

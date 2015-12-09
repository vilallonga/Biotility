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

        $scope.authentication = Authentication;
        $scope.user = $scope.authentication.user;
        console.log($scope.user);
        
        $scope.oneAtATime = true;
        $scope.isTeacher = false;
        $scope.profileVisible = true;

        if ($scope.profileType === "Teacher") {
            $scope.isTeacher = true;
        }
        $scope.groups = [
            {
                title: 'Cells',
                content: 'Lesson 4: The Nucleus',
                progress: 60
            },
            {
                title: 'Biology',
                content: 'Lesson 2: Ecosystems',
                progress: 0
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
                        $scope.groups[1].progress++;
                        //TODO: this should be:
                        /* if (allStudentGrades[i].pass == true) { */
                    }
                }
             //console.log($scope.studentGrades[i].studentName);

            }
            $scope.groups[1].progress *= 25;
        };

    }
]);

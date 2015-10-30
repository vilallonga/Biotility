'use strict';

// Main service for holding persistent data
angular.module('core').service('Subjects', ['$http', function($http) {

	// Array of the subjects we have.
	this.subjects =
    [
    	{
    		name: "Cells",
    		img: "modules/core/client/img/subject_icons/cells.png",
    		description: "Cells (general), Cell Structures and Organelles, Photosynthesis"
    	},
    	{
    		name: "Chemistry & Biochemistry",
    		img: "modules/core/client/img/subject_icons/chemistry.png",
    		description: "Chemicals are cool."
    	},
    	{
    		name: "Genetics",
    		img: "modules/core/client/img/subject_icons/genetics.png",
    		description: "GENES GENES GENES GENES GENES GENES"
    	},
    	{
    		name: "Laboratory Skills and Applications",
    		img: "modules/core/client/img/subject_icons/lab.png",
    		description: "Lab Lab Lab"
    	},
    	{
    		name: "Research and Scientific Method",
    		img: "modules/core/client/img/subject_icons/research.png",
    		description: "Research is Cool"
    	},
		{
    		name: "General Topics",
    		img: "modules/core/client/img/subject_icons/general.jpg",
    		description: "I love generalized topics"
    	},
		{
    		name: "Applied Mathematics",
    		img: "modules/core/client/img/subject_icons/math.jpg",
    		description: "Yay math"
    	},
		{
    		name: "Biotechnology Skills",
    		img: "modules/core/client/img/subject_icons/skills.jpg",
    		description: "Mad skillz"
    	},
		{
    		name: "Laboratory Equipment",
    		img: "modules/core/client/img/subject_icons/equip.jpg",
    		description: "centrifuge!"
    	},
		{
    		name: "Preparing Solutions",
    		img: "modules/core/client/img/subject_icons/solution.png",
    		description: "Mix it up"
    	},
		{
    		name: "Workplace Safety and Behavior",
    		img: "modules/core/client/img/subject_icons/work.png",
    		description: "Be professional."
    	}
		
    ];
    // Array for question objects we have for the selected subject.
    this.questionsForSubject = [ {} ];

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
    		if(elem.name === subjectName)
    			return elem;
    	});

    	return null;
    };

}]);

angular.module('core').service('NavCrumbs', [
    function() {
        this.breadcrumb = [
        {
            name: "Home",
            url: "/"
        }];
}]);
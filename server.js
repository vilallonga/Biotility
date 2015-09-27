'use strict';

/**
 * Module dependencies.
 */
var app = require('./config/lib/app');
var mongoose = require('./config/lib/mongoose');
var server = app.start();

var Student = mongoose.Student;
var Teacher = mongoose.Teacher;

var testStudent = new Student(
	{firstname: 'David',
 	lastname: 'Yeung',
  	email: 'badprogrammer@ufl.edu',
  	coursesTakingIds: [1, 3, 4, 2]});
testStudent.save();
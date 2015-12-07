'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var questionSchema = new Schema({
    category: {type: String, required: true},
    questionType: {type: String, required: true},
    description: {type : String, required: true},
    correctAnswer: {type: String, required: true},
    answerDesc1: {type: String},
    answerDesc2: {type: String},
    answerDesc3: {type: String},
    answerDesc4: {type: String}

});

questionSchema.methods.getQuizResults = function(userID) {

};

mongoose.model('QuizQuestion', questionSchema);

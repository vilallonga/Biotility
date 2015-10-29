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
    description: {type : String, required: true},
    type: {type: String, required: true},
    answerDesc1: {type: String, required: true},
    answerDesc2: {type: String, required: true},
    answerDesc3: {type: String},
    answerDesc4: {type: String},
    correctAnswer: {type: String, required: true}
});

// var ArticleSchema = new Schema({
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   title: {
//     type: String,
//     default: '',
//     trim: true,
//     required: 'Title cannot be blank'
//   },
//   content: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   user: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   }
// });

mongoose.model('QuizQuestion', questionSchema);

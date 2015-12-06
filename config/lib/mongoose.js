'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
    chalk = require('chalk'),
    path = require('path'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Load the mongoose models
module.exports.loadModels = function() {
    // Globbing model files
    config.files.server.models.forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });
};

/************* Schema Definitions *************/
var subjectSchema = new Schema({
    name: {type : String, required: true},
    id: {type: Number, required: true},
    description: {type: String},
    imgUrl: String
});
module.exports.Subject = mongoose.model('Subject', subjectSchema);
/************* End Schema Definitions *************/

// Initialize Mongoose
module.exports.connect = function(cb) {
    var _this = this;

    var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
        // Log Error
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(err);
        } else {

            // Enabling mongoose debug mode if required
            mongoose.set('debug', config.db.debug);

            // Call callback FN
            if (cb) cb(db);
        }
    });
};



module.exports.disconnect = function(cb) {
    mongoose.disconnect(function(err) {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        cb(err);
    });
};

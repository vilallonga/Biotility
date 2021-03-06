'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    validator = require('validator'),
    owasp = require('owasp-password-strength-test');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function(email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

/** Enum profile values */
var profileStates = 'Student Teacher'.split(' ');

/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
      },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    displayName: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: ''
    },
    userName: {
        type: String,
        unique: true,
        default: '',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: '',
        trim: true
    },
    salt: {
        type: String
    },
    profileImageURL: {
        type: String,
        default: '/modules/users/client/img/profile/default.jpg'
    },
    // provider: {
    //     type: String
    //     //required: 'Provider is required'
    // },
    // providerData: {},
    // additionalProvidersData: {},
    profileType: {
        type: String,
        enum: profileStates,
        trim: true,
        default: "Student"
    },
    coursesTeaching: [Number],
    courseCode: {
      type: Number,
      trim: true
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    courses: {
        courseName: {
            type: String
        },
        content: {
            type: String
        },
        progress: {
            type: String
        },
        section: {
            type: String
        }
    }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre('validate', function(next) {
    if (this.provider === 'local' && this.password) {
        var result = owasp.test(this.password);
        if (result.errors.length) {
            var error = result.errors.join(' ');
            this.invalidate('password', error);
        }
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
    var _this = this;
    var possibleUsername = username.toLowerCase() + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};


mongoose.model('User', UserSchema);

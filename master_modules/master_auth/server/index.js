/*jslint node: true */
/*global __top, __mods */
"use strict";

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('lodash');

exports.init = function () {

    if (!global.db) global.db = {};
    if (!global.db.sessions) global.db.sessions = {};

    var config = __mods.config;

    function getUserObject(idUser) {
        var user = db.users[idUser.toUpperCase()];

        if (!user) {
            return null;
        }

        var r = {
            idUser: user.idUser,
            userName: user.userName,
            rights: []
        };

        if (user.lang === "CAT") {
            r.lang = "ca";
        } else if (user.lang === "E") {
            r.lang = "es";
        } else {
            r.lang = "en";
        }

        _.each(user.rights, function (right) {
            if (right.option.toUpperCase() === "SI") {
                r.rights.push(right.idmodule.toUpperCase() + '.' + right.right.toUpperCase());
            }
        });

        return r;
    }

    passport.serializeUser(function (user, done) {
        done(null, user.idUser);
    });

    passport.deserializeUser(function (id, done) {
        done(null, getUserObject(id));
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function (req, username, password, done) {

            var user = db.users[username.toUpperCase()];

            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(new Error('User Not found.'), false);
            }

            if (user.password !== password) {
                console.log('Invalid Password');
                return done(new Error('Invalid Password'), false);
            }

            var r = getUserObject(username);

            return done(null, r);
        }));

    passport.changePassword = function(user, oldPassword, newPassword, callback){
        var user = db.users[user.idUser.toUpperCase()];
        if (!user) {
            console.log('User Not Found with username ' + user.username);
            return callback(new Error('User Not found.'));
        }
        if (user.password !== oldPassword) {
            console.log('Incorrect password');
            return callback(new Error('Incorrect password.'));
        }
        user.password = oldPassword;
        user.save(user, callback);
    };

};

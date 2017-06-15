/*jslint node: true */
"use strict";

module.exports = function(db) {

    db.sessions = {};

    db.removeUserSessions = function(idUser, cb) {
        delete db.sessions;
        cb();
    };

};

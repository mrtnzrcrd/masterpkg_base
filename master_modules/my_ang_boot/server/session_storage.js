/*jslint node: true */
"use strict";

var session = require('express-session');

var SSStorage = function(db) {
    this.db = db || {
        sessions: {}
    };
};

SSStorage.prototype.__proto__ = session.Store.prototype;

SSStorage.prototype.get = function(sid, cb) {
    if (this.db.sessions[sid]) {
        return cb(null, this.db.sessions[sid].data);
    } else {
        return cb(null, null);
    }
};

SSStorage.prototype.set = function (sid, data, cb) {
    var self = this;
    // console.log("Set session ", sid, data);
    if(!self.db.sessions){
        db.setSession(sid, data, cb);
    } else {
        var session = self.db.sessions[sid];
         if(session) {
             session.data = data;
             session.idUser = data.passport.user;
             session.date = new Date();
         } else {
             self.db.sessions[sid] = {
                 data: data,
                 sid: sid,
                 idUser: data.passport.user,
                 date: new Date()
             };
         }
        cb();
    }
};

/**
* Destroy a session's data
*/
SSStorage.prototype.destroy = function (sid, cb) {
    var self = this;
    // console.log("Destroy session ", sid, data);
    if(!self.db.sessions){
        db.destroySession(sid, data, cb);
    } else {
        delete self.db.sessions[sid];
        cb();
    }
};

module.exports = SSStorage;

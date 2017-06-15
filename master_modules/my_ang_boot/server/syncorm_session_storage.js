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
        self.db.sessions[sid] = data;
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

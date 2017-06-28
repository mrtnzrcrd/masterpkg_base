/*jslint node: true */
"use strict";

var fs = require('fs');

module.exports = function (db) {

    fs.readFile('./users.json', 'utf8', function (err, data) {
        if (err) {
            console.log("Manual users not set.");
        } else {
            db.users = JSON.parse(data);
        }
    });

    if (!db.User) {
        db.User = function (user) {
            this.idUser = user.Nom;
            this.userName = user.Nom;
            this.password = user.Password;
            this.lang = user.Idioma;
            this.rights = [];
        };
    }

    db.User.prototype.can = function (pol) {
        var arr = pol.split(".");
        if (arr.length !== 2) return false;
        var idmodule = arr[0].toUpperCase();
        var right = arr[1].toUpperCase();

        var found = _.find(this.rights, function (r) {
            if ((r.idmodule === idmodule) && (r.right === right) && (r.option.toUpperCase() === "SI")) return true;
            if ((r.idmodule === "MASTER") && (r.right === "ADMIN") && (r.option.toUpperCase() === "SI")) return true;
        });

        return found ? true : false;

    };

    db.User.prototype.save = function (user, callback) {
        return callback(new Error('Save user not implemented.'));
    };


    db.can = function (req, right) {
        if (!req.user) return false;
        if (!db.users[req.user.idUser]) return false;
        return db.users[req.user.idUser].can(right);
    };

};

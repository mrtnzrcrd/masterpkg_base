/*jslint node: true */
/*global __mods */
"use strict";

var mysql = require('mysql');
var async = require('async');

var log = function (level, msg, meta) {
    if (!__mods.logger) {
        console.log("logger not defined on mail");
        return;
    }
    meta = meta || {};
    meta = _.extend(meta, {
        module: 'mysql'
    });
    __mods.logger.log(level, msg, meta);
};

exports.init = function () {

    log("info", "MySQL Module init!");

    if (!global.db) global.db = {};

    global.db = {
        nativePool: mysql.createPool({
            connectionLimit: __mods.config.database.connectionLimit,
            host: __mods.config.database.host,
            user: __mods.config.database.user,
            password: __mods.config.database.password,
            database: __mods.config.database.database,
            connectTimeout: __mods.config.database.connectTimeout,
            acquireTimeout: __mods.config.database.acquireTimeout
        })
    };

    if (!db.users) db.users = [];

    if (!db.User) {
        db.User = function (user) {
            this.idUser = user.Nom;
            this.userName = user.Nom;
            this.password = user.Password;
            this.lang = user.Idioma;
            this.rights = [];
        };
    }

    db.User.prototype.save = function (user, callback) {
        let updateQuery = "UPDATE `users` SET " +
            "`Nom`='" + user.idUser + "' " +
            "`Password`='" + user.password + "' " +
            "`Idioma`='" + user.lang + "' " +
            "WHERE `Nom`='" + user.idUser + "'";
        db.nativePool.query(updateQuery, function (error, res, fields) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
    };

    db.nativePool.query("SELECT * FROM users", function (error, users, fields) {
        async.eachSeries(users, function (user, userCallback) {
            db.users[user.Nom] = new db.User(user);
            db.nativePool.query("SELECT * FROM drets where usuari='" + user.Nom + "'", function (error, rights, fields) {
                async.eachSeries(rights, function (right, rightCallback) {
                    db.users[user.Nom].rights.push({
                        "idmodule": right.Modul,
                        "right": right.Dret,
                        "option": right.Opcio
                    });
                    rightCallback();
                }, userCallback);
            });
        });
    })

};
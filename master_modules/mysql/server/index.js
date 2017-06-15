/*jslint node: true */
/*global __mods */
"use strict";

var mysql = require('mysql');

var log = function (level, msg, meta) {
    if(!__mods.logger) {
        console.log("logger not defined on mail");
        return;
    }
    meta = meta || {};
    meta = _.extend(meta, {
        module: 'mysql'
    });
    __mods.logger.log(level, msg, meta);
};

exports.init = function(){

    log("info", "MySQL Module init!");

    if (!global.db) {
        global.db = {
            pool: mysql.createPool({
                connectionLimit : __mods.config.database.connectionLimit,
                host     : __mods.config.database.host,
                user     : __mods.config.database.user,
                password : __mods.config.database.password,
                database : __mods.config.database.database
            })
        }
    } else {
        log("error", "An instantiated database already exists");
    }


};
'use strict';

exports.ok = function(values, res) {
    res.status(200).json({"ret" : "0", "msg" : "Select success", "data" : values});
};

exports.insert = function(values, res) {
    res.status(200).json({"ret" : "0", "msg" : "Insert success"});
};

exports.error = function(err, res) {
    res.status(200).json({"ret" : "-1", "msg" : err});
};
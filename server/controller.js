'use strict';

var response = require('./res');
var connection = require('./conn');

exports.users = function(req, res) {
    console.log(req.body.invoke);
    if(req.body.invoke=='saveDataPeserta') {
        if(req.body.nik != "" || req.body.nama != "")
        {
            try{
                const person = connection.query(`INSERT INTO person (nik, nama, email, foto, tgl_rekam) VALUES ('${req.body.nik}', '${req.body.nama}', '${req.body.email}', '${req.body.foto}', '${req.body.tgl_rekam}')`, function (err, rows, fields) {
                    if (err) {
                        response.error(err, res)
                        console.error('err from callback: ' + err.stack);
                    }
                    response.insert(rows, res);
                });
            } catch (err)
            {
                console.error('err thrown: ' + err.stack);
            }
        } else {
            console.log("NIK/Nama tidak boleh kosong");
            response.error("NIK/Nama tidak boleh kosong", res);
        }
    } else if(req.body.invoke=='getDataPesertaBackUp') {
        try{
            connection.query('SELECT * FROM person ORDER BY id DESC LIMIT 1', function (err, rows, fields){
                if (err) {
                    response.error(err, res)
                    console.error('err from callback: ' + err.stack);
                }
                response.ok(rows, res);
            });
        } catch (err)
        {
            console.error('err thrown: ' + err.stack);
        }
    } else if(req.body.invoke=='getDataPeserta') {
        try{
            connection.query('SELECT * FROM person WHERE tgl_rekam > NOW() - INTERVAL 8 MINUTE ORDER BY tgl_rekam ASC LIMIT 6', function (err, rows, fields){
                if (err) {
                    response.error(err, res)
                    console.error('err from callback: ' + err.stack);
                }
                response.ok(rows, res);
            });
        } catch (err)
        {
            console.error('err thrown: ' + err.stack);
        }
    } else {
        console.log("Invoke tidak ditemukan");
        response.error("Invoke tidak ditemukan", res);
    }
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};
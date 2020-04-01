var express = require('express');
var path = require("path");
var router = express.Router();
var fs = require('fs');
var async = require('async');
var crypto = require('crypto');
var salt = "liton";

router.get('/LightAdd', function (req, res) {
    common.log(req.session['account'], 'call LightAdd');
    common.CreateHtml("LightAdd", req, res);
});

router.get('/LightList', function (req, res) {
    common.log(req.session['account'], 'call LightList');
    common.CreateHtml("LightList", req, res);
});

router.get('/LightEdit', function (req, res) {
    common.log(req.session['account'], 'call LightEdit');
    common.CreateHtml("LightEdit", req, res);
});

router.post('/AddLight', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        var hash = crypto.createHash('sha512');
        var pass = hash.update(req.body.password + salt).digest('hex');
        var tempForm = req.body;
        common.BackendConnection(res, function (err, connection) {
            var sql = "INSERT INTO account (account,password,name,Lighto,lock_status) VALUES (?,?,?,?,'N')";
            sql = connection.format(sql, [tempForm.Account, pass, tempForm.name, tempForm.LightGroup]);
            common.log(req.session['account'], sql);
            connection.query(sql, function (err, dbresults, fields) {
                if (err) {
                    throw err;
                    res.send({ code: "-1", msg: "失敗" });
                } else {
                    res.send({ code: "0", msg: "成功", data: dbresults });
                }
                connection.release();
                res.end();
            });
        });
    });
});

router.post('/GetLightData', function (req, res) {
    common.CreateHtml("Account_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
            var AccountID = req.body.Id;
            
            var dataSelect = "select * from account where id="+AccountID+";";
   
            var sql = dataSelect;

            common.log(req.session['account'], sql);

            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], err);
                    res.send({error : err});
                }
                else {
            
                    res.send({ data: result[0] });
                }
                connection.release();
                res.end();
            });

        });        
    });

});

router.post('/GetStaffData', function (req, res) {
    common.CreateHtml("Account_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
           
            
            var dataSelect = "select * from account where Lighto='staff' and lock_status='N';";
   
            var sql = dataSelect;

            common.log(req.session['account'], sql);

            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], err);
                    res.send({error : err});
                }
                else {
            
                    res.send({ data: result });
                }
                connection.release();
                res.end();
            });

        });        
    });

});

router.post('/GetLightList', function (req, res) {
    common.CreateHtml("Account_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
            
            var dataSelect = "select * from account;";
            var countSelect = "select COUNT(*) as count from account;";

   
            var sql = countSelect + dataSelect;

            common.log(req.session['account'], sql);

            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], err);
                    res.send({error : err});
                }
                else {
                    var totallength = result[0][0].count;
                    res.send({ recordsTotal: totallength, recordsFiltered: totallength, data: result[1] });
                }
                connection.release();
                res.end();
            });

        });        
    });

});

router.post('/DeleteLight', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            var sql = "delete FROM account where id="  + connection.escape(req.body.Id);
            common.log(req.session['account'], sql);
            connection.query(sql, function (err, dbresults, fields) {
                if (err) {
                    throw err;
                    res.send({ code: "-1", msg: "刪除失敗" });
                } else {
                    res.send({ code: "0", msg: "刪除成功" });
                }
                connection.release();
                res.end();
            });
        });
    });
});

router.post('/EditLight', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            var hash = crypto.createHash('sha512');
            var pass = hash.update(req.body.password + salt).digest('hex');
            var tempForm = req.body;

            var hash = crypto.createHash('sha512');
            var pass = hash.update(tempForm.password + salt).digest('hex');

            var editLightSQL = "update account set `account`=?,  `name`=?, `Lighto`=?, `lock_status`=? where `id`=?;";

            var LightData = 
            [
                tempForm.account,
                tempForm.name,
                tempForm.Lighto,
                tempForm.lock,
                tempForm.id
            ];
  
            editLightSQL = connection.format(editLightSQL, LightData);

            var sql = editLightSQL;

            common.log(req.session['account'], sql);
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    connection.release();                    
                    res.send({ code: -1, msg: "更新失敗", err: error }).end();

                }
                else {
                    connection.release();                    
                    res.send({ code: 0, msg: "更新成功!" }).end();
                }
            });

        });
    });
});

module.exports = router;
var express = require('express');
var path = require("path");
var router = express.Router();
var fs = require('fs');
var async = require('async');
var crypto = require('crypto');
var salt = "liton";

router.get('/FamilyAdd', function (req, res) {
    common.log(req.session['account'], 'call FamilyAdd');
    common.CreateHtml("FamilyAdd", req, res);
});

router.get('/FamilyList', function (req, res) {
    common.log(req.session['account'], 'call FamilyList');
    common.CreateHtml("FamilyList", req, res);
});

router.get('/FamilyEdit', function (req, res) {
    common.log(req.session['account'], 'call FamilyEdit');
    common.CreateHtml("FamilyEdit", req, res);
});

router.post('/AddFamily', function (req, res) {
    common.CreateHtml("Family_Transfer", req, res, function (err) {
        var hash = crypto.createHash('sha512');
        var pass = hash.update(req.body.password + salt).digest('hex');
        var tempForm = req.body;
        common.BackendConnection(res, function (err, connection) {
            var sql = "INSERT INTO account (account,password,name,Familyo,lock_status) VALUES (?,?,?,?,'N')";
            sql = connection.format(sql, [tempForm.Account, pass, tempForm.name, tempForm.FamilyGroup]);
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

router.post('/GetFamilyData', function (req, res) {
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
           
            
            var dataSelect = "select * from account where Familyo='staff' and lock_status='N';";
   
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

router.post('/GetFamilyList', function (req, res) {
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

router.post('/DeleteFamily', function (req, res) {
    common.CreateHtml("Family_Transfer", req, res, function (err) {
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

router.post('/EditFamily', function (req, res) {
    common.CreateHtml("Family_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            var hash = crypto.createHash('sha512');
            var pass = hash.update(req.body.password + salt).digest('hex');
            var tempForm = req.body;

            var hash = crypto.createHash('sha512');
            var pass = hash.update(tempForm.password + salt).digest('hex');

            var editFamilySQL = "update account set `account`=?,  `name`=?, `Familyo`=?, `lock_status`=? where `id`=?;";

            var FamilyData = 
            [
                tempForm.account,
                tempForm.name,
                tempForm.Familyo,
                tempForm.lock,
                tempForm.id
            ];
  
            editFamilySQL = connection.format(editFamilySQL, FamilyData);

            var sql = editFamilySQL;

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
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
        var requestData = JSON.parse(req.body.requestData);

        common.BackendConnection(res, function (err, connection) {
            var sql = "INSERT INTO ligth_type (name, price) VALUES (?,?)";
            sql = connection.format(sql, [requestData.name, requestData.price]);
            common.log(req.session['account'], sql);
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    connection.release();                    
                    res.send({ code: -1, msg: "新增失敗", err: error }).end();
                }
                else {                    
                    connection.release();                    
                    res.send({ code: 0, msg: "新增成功!" }).end();
                }
            });
        });
    });
});

router.post('/GetLightData', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
            var lightID = req.body.Id;
            
            var dataSelect = "select * from light_type where id="+lightID+";";
   
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


router.post('/GetLightList', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
            
            var dataSelect = "select * from light_type;";
            var countSelect = "select COUNT(*) as count from light_type;";

   
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
            var sql = "delete FROM light_type where id="  + connection.escape(req.body.Id);
            common.log(req.session['account'], sql);
            connection.query(sql, function (err, dbresults, fields) {
                if (err) {
                    res.send({ code: "-1", msg: "刪除失敗" });
                    throw err;
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
            var requestData = JSON.parse(req.body.requestData);
            var editLightSQL = "update light_type set `name`=?,  `price`=? where `id`=?;";

            var LightData = 
            [
                requestData.name,
                requestData.price,
                requestData.id,
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
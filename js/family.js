var express = require('express');
var router = express.Router();

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
        common.BackendConnection(res, function (err, connection) {
            var sql = "INSERT INTO family (tel, phone, address, delegate, members) VALUES (?,?,?,?,?)";
            var requestData = JSON.parse(req.body.requestData);
            var membersJson = JSON.stringify(requestData.members);

            sql = connection.format(sql, [requestData.tel, requestData.phone, requestData.address, requestData.delegate, membersJson]);     
            common.log(req.session['account'], sql);
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    connection.release();                    
                    res.send({ code: -1, msg: "新增信徒戶口失敗", err: error }).end();
                }
                else {                    
                    connection.release();                    
                    res.send({ code: 0, msg: "新增成功!" }).end();
                }
            });
        });
    });
});

router.post('/EditFamily', function (req, res) {
    common.CreateHtml("Family_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            var sql = "update family  set `tel`=?, `phone`=?, `address`=?, `delegate`=?, `members`=? where `id`=?;";
            var requestData = JSON.parse(req.body.requestData);
            var membersJson = JSON.stringify(requestData.members);
            sql = connection.format(sql, [requestData.tel, requestData.phone, requestData.address, requestData.delegate, membersJson, requestData.id]);
            common.log(req.session['account'], sql);
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    connection.release();                    
                    res.send({ code: -1, msg: "編輯信徒戶口失敗", err: error }).end();
                }
                else {
                    connection.release();                    
                    res.send({ code: 0, msg: "編輯成功!" }).end();
                }
            });
        });
    });
});

router.post('/GetFamilyData', function (req, res) {
    common.CreateHtml("Family_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
            var FamilyID = req.body.Id;
            
            var dataSelect = "select * from family where id="+FamilyID+";";


            var sql = dataSelect;

            common.log(req.session['account'], sql);

            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    res.send({error : error});
                }
                else {
            
                    res.send({ family: result[0]});
                }
                connection.release();
                res.end();
            });

        });        
    });

});


router.post('/GetFamilyList', function (req, res) {
    common.CreateHtml("Family_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
            
            var dataSelect = "select * from family;";
            var countSelect = "select COUNT(*) as count from family;";

   
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
            var sql = "delete FROM family where id="  + connection.escape(req.body.Id);
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


module.exports = router;
var express = require('express');
var router = express.Router();

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

router.get('/LightProcess', function (req, res) {
    common.log(req.session['account'], 'call LightProcess');
    common.CreateHtml("LightProcess", req, res);
});

router.get('/LightHistory', function (req, res) {
    common.log(req.session['account'], 'call LightHistory');
    common.CreateHtml("LightHistory", req, res);
});

router.get('/LightWork', function (req, res) {
    common.log(req.session['account'], 'call LightWork');
    common.CreateHtml("LightWork", req, res);
});

router.get('/LightHistoryEdit', function (req, res) {
    common.log(req.session['account'], 'call LightHistoryEdit');
    common.CreateHtml("LightHistoryEdit", req, res);
});

router.get('/LightWorkCopy', function (req, res) {
    common.log(req.session['account'], 'call LightWorkCopy');
    common.CreateHtml("LightWorkCopy", req, res);
});

router.get('/LightRecordTotal', function (req, res) {
    common.log(req.session['account'], 'call LightRecordTotal');
    common.CreateHtml("LightRecordTotal", req, res);
});

router.get('/PrintLightData', function (req, res) {
    common.log(req.session['account'], 'call PrintLightData');
    common.CreateHtml("PrintLightData", req, res);
});

router.post('/AddLight', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        var requestData = JSON.parse(req.body.requestData);

        common.BackendConnection(res, function (err, connection) {
            var sql = "INSERT INTO light_type (name, price) VALUES (?,?)";
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

router.post('/LightWorkEdit', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        var requestData = JSON.parse(req.body.requestData);
        var nameListString = JSON.stringify(requestData.nameList);
        var nameList = requestData.nameList;

        common.BackendConnection(res, function (err, connection) {
            var sql = "update light_history set name_list=?, total_price=?, gan_year=? where id=?;";
            sql = connection.format(sql, [nameListString, requestData.totalPrice, requestData.ganYear, requestData.historyId]);
            
            sql += "update light_record set is_del=1 where history_id="+requestData.historyId+";";

            for(var i = 0; i < nameList.length; i++) {
                var name = nameList[i];
                var temp = "insert into light_record (name, light_id, price, note, gan_year, family_id, history_id) values (?,?,?,?,?,?,?);";
                sql += connection.format(temp, [name.name, name.lightId, name.price, name.note, requestData.ganYear, requestData.familyId, requestData.historyId]);
            }
            
            common.log(req.session['account'], sql);
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    connection.release();                    
                    res.send({ code: -1, msg: "編輯失敗", err: error }).end();
                }
                else {                    
                    connection.release();                    
                    res.send({ code: 0, msg: "編輯成功!" }).end();
                }
            });
        });
    });
});

router.post('/LightHistoryDel', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            var Id = connection.escape(req.body.Id);
            var sql = "update light_history set is_del=1 where id="+Id+";";         
            sql += "update light_record set is_del=1 where history_id="+Id+";";
            
            common.log(req.session['account'], sql);
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    connection.release();                    
                    res.send({ code: -1, msg: "刪除失敗", err: error }).end();
                }
                else {                    
                    connection.release();                    
                    res.send({ code: 0, msg: "刪除成功!" }).end();
                }
            });
        });
    });
});

router.post('/LightWorkAdd', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        var requestData = JSON.parse(req.body.requestData);
        var nameListString = JSON.stringify(requestData.nameList);
        var nameList = requestData.nameList;

        common.BackendConnection(res, function (err, connection) {
            var sql = "INSERT INTO light_history (name_list, total_price, gan_year, family_id) VALUES (?,?,?,?);";
            sql = connection.format(sql, [nameListString, requestData.totalPrice, requestData.ganYear, requestData.familyId]);            
            sql += 'select LAST_INSERT_ID() as id;';
            
            common.log(req.session['account'], sql);
            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], error);
                    connection.release();                    
                    res.send({ code: -1, msg: "新增失敗", err: error }).end();
                }
                else {  
                    var historyId = result[1][0].id;
                    sql = "";
                    
                    for(var i = 0; i < nameList.length; i++) {
                        var name = nameList[i];
                        var temp = "insert into light_record (name, light_id, price, note, gan_year, family_id, history_id) values (?,?,?,?,?,?,?);";
                        sql += connection.format(temp, [name.name, name.lightId, name.price, name.note, requestData.ganYear, requestData.familyId, historyId]);
                    }                  
                    
                    connection.query(sql, function(e, r, f) {
                        if (e) {
                            common.log(req.session['account'], e);
                            connection.release();                    
                            res.send({ code: -1, msg: "新增失敗", err: e }).end();
                        }
                        else {
                            connection.release();                    
                            res.send({ code: 0, msg: "新增成功!", historyId: historyId}).end();
                        }
                    });
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
             
            var dataSelect = "select * from light_type;";
   
            var sql = dataSelect;

            common.log(req.session['account'], sql);

            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], err);
                    res.send({error : err});
                }
                else {
            
                    res.send({ lightType: result });
                }
                connection.release();
                res.end();
            });

        });        
    });
});

router.post('/GetLightRecordTotal', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        var requestData = JSON.parse(req.body.requestData);
        var gan = requestData.gan;
        var lightType = requestData.lightType;
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
             
            var dataSelect = "SELECT gan_year, count(b.name) as count, b.`name`, sum(a.`price`) as total FROM light_record as a inner join light_type as b on a.light_id = b.id where a.gan_year="+gan+" and is_del=0 group by a.light_id;";
                        
            if (lightType != -1) {
                dataSelect = "SELECT gan_year, count(b.name) as count, b.`name`, sum(a.`price`) as total FROM light_record as a inner join light_type as b on a.light_id = b.id where a.gan_year="+gan+" and light_id="+lightType+" and is_del=0 group by a.light_id;";
            }
   
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

router.post('/GetLightHistoryData', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
             
            var historyID = req.body.Id;
            
            var dataSelect = "select * from light_history where id="+historyID+";";
   
            var sql = dataSelect;

            common.log(req.session['account'], sql);

            connection.query(sql, function (error, result, fields) {
                if (error) {
                    common.log(req.session['account'], err);
                    res.send({error : err});
                }
                else {
            
                    res.send({ history: result[0] });
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

router.post('/GetLightHistory', function (req, res) {
    common.CreateHtml("Light_Transfer", req, res, function (err) {
        common.BackendConnection(res, function (err, connection) {
            if (err) {
                common.log(res.session['account'], err);
                throw err;
            }
            
            var familyID = req.body.Id;
            var dataSelect = "select * from light_history where is_del=0 and family_id="+familyID+";";
            var countSelect = "select COUNT(*) as count from light_history where is_del=0 and family_id="+familyID+";";

   
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
var express = require('express');
var router = express.Router();
const cryptoRandomString = require('crypto-random-string');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/', function (req, res) {
    res.render('signin');
});

MongoClient.connect(url, function(err, db) {    
    if (err) throw err;
    var dbo = db.db("mydb");

    router.post('/', function (req, res) {
        console.log(req.body.name+"  sign in !");
        //不存在，取的名字後登入主頁
        var myobj={user:req.body.name};
        if (!req.body.name) {
            //重複 或 未填入說鞥者名稱
            res.redirect('/signin');
        } else {
            let user_id = cryptoRandomString(5);
            res.cookie("user", req.body.name, { maxAge: 1000 * 60 * 60 * 24 * 30 });
            res.cookie("user_id", user_id, { maxAge: 1000 * 60 * 60 * 24 * 30 });
            dbo.collection("user",function(err,collection){
                collection.find({user:req.body.name}).toArray(function(err,items){
                    if(err) throw err;
                    console.log(items);
                    console.log("We found "+items.length+" results!");
                    if(items.length==0){
                        dbo.collection("user").insertOne(myobj, function(err, res) {
                        
                            if (err) throw err;
                            console.log("1 document inserted");   
                        });
                    }
                    if(items.length!=0){
                        console.log("ID is "+items[0]._id+" !");
                    }
                })
            });
            res.redirect('/make_pair?user_id=' + user_id);
        }
    });
})
module.exports = router;

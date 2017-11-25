var express = require('express');
const fs = require('fs');
var mongojs=require('mongojs');
var database = mongojs('carwash',['carcollection']);
var http = require('http');
var path  = require('path');
var urlencoded = require('url');
var bodyParser = require('body-parser');
var json = require('json');
var app = express();


app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.listen(8000,function(){
	console.log('listening');
});
app.get('/cardetail'  , function(req, res) {
    console.log("node server");
    database.carcollection.find(function(err,docs){
    res.json(docs);
    });	   
});
app.post('/cardetail' , function(req,res){
	console.log(req.body);
    database.carcollection.insert(req.body,function(err,doc){
       res.json(doc);
    });
});
app.delete('/cardetail/:id' ,function(req,res){
   var id = req.params.id;
   database.carcollection.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
   });
});  
 app.get('/cardetail/:id' ,function(req,res){
   var id = req.params.id;
   database.carcollection.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
    res.json(doc);
  });
 }); 
 app.put('/cardetail/:id' , function(req,res){
 	var id = req.params.id;
 	database.carcollection.findAndModify({query: {_id: mongojs.ObjectId(id)},
 		update: {$set : {carname :req.body.carname, carnumber :req.body.carnumber, intime :req.body.intime ,outtime :req.body.outtime}}
 		,new : true},function(err,doc){
 
 		});
 }); 
 

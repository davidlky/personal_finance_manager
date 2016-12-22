var router = require('express').Router();
var moment = require('moment');
var Models = require('../db/model');
var Record = Models.Record;

router.get('/',function(req,res){
	Record.findAll({include: [{ all: true }]}).then(function(records){
		res.send(records);
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.get('/:date_start/:date_end',function(req,res){
	if (!moment(req.params.date_start, "YYYY-MM-DD").isValid()
		||!moment(req.params.date_end, "YYYY-MM-DD").isValid()){
		res.status(401).send("Invalid Date");
		return;
	}
	var date_start = moment(req.params.date_start, "YYYY-MM-DD");
	var date_end = moment(req.params.date_end, "YYYY-MM-DD");

	Record.findAll({ 
		where: {
			date_added: {
				$gte: date_start,
				$lts: date_end
			},
			tag: {}
		},
		include: [{ all: true }]
	}).then(function(records){
		res.send(records);
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});


router.get('/:id',function(req,res){
	Record.findById(req.params.id,{include: [{ all: true }]}).then(function(record){
		res.send(record);
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.post('/',function(req,res){
	if (!moment(req.body.date).isValid()){
		res.status(401).send("Invalid Date");
		return;
	}
	var date = moment(req.body.date);
	Record.build({
		name: req.body.name,
		amount: req.body.amount*100,
		accountId: req.body.tagId,
		date_added:date,
		note:req.body.note,
		split_with:req.body.split_with
	})
	.save()
	.then(function(record){
		Models.Tag.findAll({where:{
			id: req.body.tagId.split(",")
		}}).then(function(tags){
			record.addTags(tags);
			res.send(record);
		}).catch(function (err) {
			res.status(403).send("cannot find tag");
		});
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.post('/:id',function(req,res){
	if (req.body.date){
		if (!moment(req.body.date).isValid()){
			res.status(401).send("Invalid Date");
			return;
		}
		req.body.date = moment(req.body.date);
	}
	if(req.body.amount){
		req.body.amount = req.body.amount*100;
	}
	Record.findById(req.params.id).then(function(record){
		if (!record){
			res.status(403).send("not found");
		}
		record.update(req.body, {fields: Object.keys(record.dataValues)});
		Models.Tag.findAll({where:{
			id: req.body.tagId.split(",")
		}}).then(function(tags){
			record.setTags(tags);
			res.send(record);
		}).catch(function (err) {
			res.status(403).send("cannot find tag");
		});
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.delete('/:id',function(req,res){
	Record.destroy({where:{id:req.params.id}}).then(function(num){
		if (num<1){
			res.status(403).send("Nothing Deleted");
		}
		res.send("done");
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

module.exports = router;
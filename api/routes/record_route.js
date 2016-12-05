var router = require('express').Router();
var moment = require('moment');
var Models = require('../db/model');
var Record = Models.Record;

router.get('/',function(req,res){
	Record.findAll({include: [{ all: true }]}).then(function(records){
		res.send(records);
	})
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
			}
		},
		include: [{ all: true }]
	}).then(function(records){
		res.send(records);
	})
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
		tagId: req.body.tagId,
		accountId: req.body.tagId,
		date_added:date,
		note:req.body.note,
		split_with:req.body.split_with
	})
	.save()
	.then(function(record){
		res.send(record);
	})
});

router.post('/:id',function(req,res){
	if (req.body.date){
		if (!moment(req.body.date).isValid()){
			res.status(401).send("Invalid Date");
			return;
		}
		req.body.date = moment(req.body.date);
	}
	Record.findById(req.params.id,function(record){
		if (!record){
			res.status(402).send("not found");
		}
		record.update(req.body, fields: Object.keys(record));
		res.send(record);
	});
});

router.delete('/:id',function(req,res){
	Record.destroy({where:{id:req.params.id}}).then(function(num){
		if (num<1){
			res.status(402).send("Nothing Deleted");
		}
		res.send(num);
	});
});

module.exports = router;
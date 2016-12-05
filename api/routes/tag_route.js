var router = require('express').Router();
var moment = require('moment');
var Models = require('../db/model');
var Record = Models.Record;
var Tag = Models.Tag;

router.get('/',function(req,res){
	Tag.findAll({include: [{ all: true }]}).then(function(tags){
		res.send(tags);
	}).catch(function (err) {
		res.status(402).send("cannot find item");
	});
});

router.get('/:tagid/:date_start/:date_end',function(req,res){
	if (!moment(req.params.date_start, "YYYY-MM-DD").isValid()
		||!moment(req.params.date_end, "YYYY-MM-DD").isValid()){
		res.status(401).send("Invalid Date");
		return;
	}
	var date_start = moment(req.params.date_start, "YYYY-MM-DD");
	var date_end = moment(req.params.date_end, "YYYY-MM-DD");

	Record.findAll({ 
		include: [{
			model: Tag,
			through: {
				where: { id: req.params.tagid}
			}
		}],
		where: {
			date_added: {
				$gte: date_start,
				$lts: date_end
			},
		},
		include: [{ all: true }]
	}).then(function(records){
		res.send(records);
	})
});

router.get('/:id',function(req,res){
	Tag.findById(req.params.id,{include: [{ all: true }]}).then(function(tag){
		res.send(tag);
	}).catch(function (err) {
		res.status(402).send("cannot find item");
	});
});

router.post('/',function(req,res){
	Tag.build({
		name: req.body.name,
		parentTag: req.body.parentTag,
	})
	.save()
	.then(function(tag){
		res.send(tag);
	}).catch(function (err) {
		res.status(402).send("cannot find item");
	});
});

router.post('/:id',function(req,res){
	Tag.findById(req.params.id).then(function(tag){
		if (!tag){
			res.status(402).send("not found");
		}
		tag.update(req.body, {fields: Object.keys(tag)});
		res.send(tag);
	}).catch(function (err) {
		res.status(402).send("cannot find item");
	});
});

router.delete('/:id',function(req,res){
	Tag.destroy({
		where:{id:req.params.id},
		truncate:true,
		cascard:true
	}).then(function(num){
		if (num<1){
			res.status(402).send("Nothing Deleted");
		}
		res.send(num);
	}).catch(function (err) {
		res.status(402).send("cannot find item");
	});
});

module.exports = router;
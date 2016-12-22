var router = require('express').Router();
var moment = require('moment');
var Models = require('../db/model');
var Record = Models.Record;
var Account = Models.Account;

router.get('/',function(req,res){
	Account.findAll({include: [{ all: true }]}).then(function(accounts){
		res.send(accounts);
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.get('/:id',function(req,res){
	Account.findById(req.params.id,{include: [{ all: true }]}).then(function(account){
		res.send(account);
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.post('/',function(req,res){
	Account.build({
		name: req.body.name,
		type: req.body.type,
		currencyType: req.body.currencyType,
	})
	.save()
	.then(function(account){
		res.send(account);
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.post('/:id',function(req,res){
	Account.findById(req.params.id).then(function(account){
		if (!account){
			res.status(403).send("not found");
		}
		account.update(req.body, {fields: Object.keys(account.dataValues)});
		res.send(account);
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

router.delete('/:id/:updateId',function(req,res){
	Account.findById(req.params.updateId,function(account){
		if(!account){
			res.status(403).send("not found");
		}
		Record.findAll({ 
			where:{
				accountId: req.params.id
			}
		}).then(function(records){
			for (record in records){
				record.update([{accountId:account.id}])
			}
			Account.destroy({
				where:{id:req.params.id},
			}).then(function(num){
				if (num<1){
					res.status(403).send("Nothing Deleted");
				}
				res.send("done");
			}).catch(function (err) {
				res.status(403).send("cannot find account");
			});
		}).catch(function (err) {
			res.status(403).send("cannot find records");
		});
	}).catch(function (err) {
		res.status(403).send("cannot find item");
	});
});

module.exports = router;
var sequelize = require("./db");
var Model = require('./model');

Model.Record.belongsToMany(Model.Tag, {through: 'RecordProject'});
Model.Tag.belongsToMany(Model.Record, {through: 'RecordProject'});
Model.Record.belongsTo(Model.Account);  

sequelize.sync().then(function() {
	Model.Tag.findAll().then(function(tags){
		if (tags.length==0){
			var tag = 
				Model.Tag.build({
					name: 'Personal',
				})
				.save()
				.then(function(currentTag){
					Model.Tag.build({
						name: 'Vacation',
						parentTag: currentTag.id
					}).save();
					Model.Account.findAll().then(function(accounts){
						if (accounts.length==0){
							Model.Account.build({
								name: 'Sample Debit Card',
								type: 'debit',
							}).save()
							.then(function(account){
								Model.Record.findAll().then(function(records){
									if (records.length==0){
										var record = 
											Model.Record.build({
												name: 'Random Spending',
												amount: 23.5*100,
												accountId: account.id,
											})
											.save().then(function(record){
												record.addTag(currentTag);
											});
									}
								})
							});
						}
					})
				});
		}
	})
    console.log('DB Sync Completed');
});


module.exports = sequelize;

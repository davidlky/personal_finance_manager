var sequelize = require('../db');
var DataTypes = require('sequelize');

var Account = sequelize.define("accounts", {
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255],
            notEmpty: true
        }
    },
    type: {
        //TODO add more types! 
        type: DataTypes.ENUM("debit","credit","other"),
        defaultValue: "other"
    },
    currencyType: {
        //TODO add more types! 
        type: DataTypes.ENUM("USD","CAD"),
        defaultValue: "USD"
    }
});

module.exports = Account;

var sequelize = require('../db');
var DataTypes = require('sequelize');

var Record = sequelize.define("records", {
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
    notes: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255],
        },
        defaultValue: ""
    },
    split_with: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    date_added: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    }
});

module.exports = Record;

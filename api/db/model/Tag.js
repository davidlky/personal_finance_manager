var sequelize = require('../db');
var DataTypes = require('sequelize');

var Tag = sequelize.define("tags", {
    id: {
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    parentTag: {
        type:DataTypes.UUID,
        defaultValue: null
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            len: [0, 255],
            notEmpty: true
        }
    }
});

module.exports = Tag;

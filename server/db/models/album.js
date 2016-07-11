'use strict';

const db = require('../db');
const DataTypes = db.Sequelize;
const unique = require('./plugins/unique-through');

module.exports = db.define('album', {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set: function (val) {
      this.setDataValue('name', val.trim());
    }
  },
  cover: {
    type: DataTypes.BLOB
  },
  coverType: {
    type: DataTypes.STRING
  },
  artists: unique('artists').through('songs')

}, {

  defaultScope: {
    attributes: { exclude: ['cover', 'coverType'] }
  },
  scopes: {
    songIds: () => ({ // function form lets us use to-be-defined models
      include: [{
        model: db.model('song'),
        attributes: ['id']
      }]
    }),
    populated: () => ({ // function form lets us use to-be-defined models
      include: [{
        model: db.model('song').scope('defaultScope', 'populated')
      }]
    }),
  }

});

'use strict';

const Sequelize = require('sequelize');
const config = require('config');
const isURL = require('validator/lib/isURL');
const encrypt = require('../../utils/hash').encrypt;
const saltgen = require('../../utils/hash').salt;

module.exports = sequelize => {

  const User = sequelize.define('users', {

    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    screenName: {
      type: Sequelize.CHAR(15),
      field: 'screen_name',
      unique: true,
      allowNull: false,
      validate: {
        is: config.pattern.user.screenName.regExp,
        len: [1,15],
        notEmpty: true
      }
    },

    name: {
      type: Sequelize.STRING(50),
      field: 'name',
      allowNull: false,
      validate: {
        len: [1,50],
        notEmpty: true
      }
    },

    email: {
      type: Sequelize.STRING(254),
      field: 'email',
      allowNull: false,
      set: function(val) {
        const emailHash = encrypt(val);
        this.setDataValue('emailHash', emailHash);
        this.setDataValue('email', val);
      },
      validate: {
        isEmail: true,
        len: [1, 254],
        notEmpty: true
      }
    },

    emailHash: {
      type: Sequelize.CHAR(64),
      field: 'email_hash',
      unique: true,
      allowNull: false
    },

    publicEmail: {
      type: Sequelize.BOOLEAN(),
      field: 'public_email',
      defaultValue: false,
      allowNull: false
    },
    
    password: {
      type: Sequelize.VIRTUAL(),
      set: function(val) {
        const salt = saltgen();
        const password = encrypt(val, salt);
        this.setDataValue('passwordHash', password);
        this.setDataValue('passwordSalt', salt);
      },
      validate: {
        is: config.pattern.user.screenName.regExp,
        notEmpty: true,
      }
    },

    passwordHash: {
      type: Sequelize.CHAR(64),
      field: 'password',
      allowNull: false
    },
  
    passwordSalt: {
      type: Sequelize.CHAR(64),
      field: 'password_salt',
      allowNull: false
    },

    description: {
      type: Sequelize.STRING(160),
      field: 'description',
      defaultValue: '',
      allowNull: false,
      validate: {
        len: [0, 160],
      }
    },

    url: {
      type: Sequelize.STRING(2100),
      field: 'url',
      defaultValue: '',
      allowNull: false,
      validate: {
        isEven: val => {
          if (val !== '' && !isURL(val)) {
            const validationErrorItem = new Sequelize.ValidationErrorItem(
              'Validation isUrl on url failed', // message
              'Validation error', // type
              'url', // path
              val // value
            );
            throw new Sequelize.ValidationError('Validation isUrl on url failed', validationErrorItem);
          }
        },
        len: [0, 2100]
      }
    },

    location: {
      type: Sequelize.STRING(30),
      field: 'location',
      defaultValue: '',
      allowNull: false,
      validate: {
        len: [0, 30]
      }
    },

    createdAt: {
      type: Sequelize.DATE(),
      field: 'created_at'
    },

    updatedAt: {
      type: Sequelize.DATE(),
      field: 'updated_at'
    }
  }, {
    // createdAt, updatedAt
    timestamps: true,

    // テーブルネーム
    tableName: 'users',

    // underscore
    underscored: true,
  });
  
  return User;
};

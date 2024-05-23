const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name cannot be empty or null!" }
      }
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Surname cannot be empty or null!" }
        }
      },
    password: {
      type: DataTypes.STRING,
      trim: true, // remove spaces on both ends             
      allowNull: false,
      validate: {
        notNull: { msg: "Password cannot be empty or null!" }
      }
    },
    profilePic: {
        type: DataTypes.BLOB('long'), // <- image file
        allowNull: true 
      },
    contact: {
        type: DataTypes.ARRAY
      },
    email: {
        type: DataTypes.STRING
      },
    userType: {
      type: DataTypes.ENUM('alumni', 'admin'),
      defaultValue: 'alumni',
      validate: {
        isIn: {
          args: [['alumni', 'admin']],
          msg: "Allowed types of users: Alumni and Admin"
        }
      }
    }
  }, {
    timestamps: false
  });
};

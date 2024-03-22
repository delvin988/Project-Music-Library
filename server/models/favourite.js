'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favourite.belongsTo(models.User, { foreignKey: 'UserId' });

    }
  }
  Favourite.init({
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         notNull: {
            msg: "artistName is required",
         },
         notEmpty: {
            msg: "artistName is required",
         },
      },
   },
   genres: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
       notNull: {
          msg: "genres is required",
       },
       notEmpty: {
          msg: "genres is required",
       },
    },
 },
 imgUrl: {
  type: DataTypes.TEXT,
  allowNull: false,
  validate: {
     notNull: {
        msg: "imgUrl is required",
     },
     notEmpty: {
        msg: "imgUrl is required",
     },
  },
},
 album: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
     notNull: {
        msg: "album is required",
     },
     notEmpty: {
        msg: "album is required",
     },
  },
},
title: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
     notNull: {
        msg: "title is required",
     },
     notEmpty: {
        msg: "title is required",
     },
  },
},
preview: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
     notNull: {
        msg: "preview is required",
     },
     notEmpty: {
        msg: "preview is required",
     },
  },
},
lyric: {
  type: DataTypes.TEXT,
},
   UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "UserId Is Required",
      },
      notEmpty: {
        msg: "UserId Is Required",
      },
    },
  },
  
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};
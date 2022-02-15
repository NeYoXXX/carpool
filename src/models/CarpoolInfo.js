'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CarpoolInfo extends Model {
    static associate(db){
      db.Place.hasMany(CarpoolInfo, {
        onDelete:'',
        onUpdate:'',
        constraints:false,
        foreignKey: 'placeId',
      })
      CarpoolInfo.belongsTo(db.Place,{
        onDelete:'',
        onUpdate:'',
        constraints:false,
      })
      db.User.hasMany(CarpoolInfo, {
        onDelete:'',
        onUpdate:'',
        constraints:false,
        foreignKey: 'releaseUserId',
      })
      CarpoolInfo.belongsTo(db.User,{
        onDelete:'',
        onUpdate:'',
        constraints:false,
      })
    }
  }
  CarpoolInfo.init(
    {
      departureTime: {
        type: DataTypes.DATE,
        comment: '出发时间',
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      startingPoint: {
        type: DataTypes.STRING,
        comment: '起始地点',
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      end: {
        type: DataTypes.STRING,
        comment: '终点',
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      waypoint: {
        type: DataTypes.STRING,
        comment: '途经点',
      },
      infoType: {
        type: DataTypes.STRING(1),
        comment: '0 人找车，1 车找人',
        defaultValue: 0,
        allowNull: false,
        validate: {
          isIn: ['0', '1'],
          notNull: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '电话号码',
        validate: {
          is: {
            args: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            msg: '电话号码格式出错',
          },
          notNull: true,
        },
      },
      isCancel: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        comment: '0 关闭信息，1 开启',
        validate: {
          isIn: {
            args: [[true, false]],
            msg: '必须为true或false',
          },
        },
      },
      releaseUserId: {
        type: DataTypes.INTEGER,
        comment: '发布人id',
        field:'ReleaseUserId'
      },
      placeId: {
        type: DataTypes.INTEGER,
        comment: '地址信息id',
        field:'PlaceId'
      },
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: 'CarpoolInfo', // 我们需要选择模型名称
      paranoid: true,
    },
  )
  
  return CarpoolInfo
}

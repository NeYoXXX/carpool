'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      weixinName: {
        type: DataTypes.STRING,
        comment: '微信名称',
        allowNull: false,
        validate: {
          notNull: true
        }
      },
      weixinHeadPortrait: {
        type: DataTypes.STRING,
        comment: '微信头像'
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        comment: '电话号码',
        validate: {
          is: {
            args: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            msg: '电话号码格式出错'
          },
          notNull: true
        }
      }
    },
    {
      // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: 'User', // 我们需要选择模型名称
      paranoid: true
    }
  );
  return User;
};

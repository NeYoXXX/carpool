'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class SubscriptionUserRelation extends Model {
    static associate(db){
      db.User.hasMany(SubscriptionUserRelation,{
        onDelete:'',
        onUpdate:'',
        constraints:false,
        foreignKey: 'subscriptionUserId'
      });
      db.CarpoolInfo.hasMany(SubscriptionUserRelation,{
        onDelete:'',
        onUpdate:'',
        constraints:false,
        foreignKey: 'carpoolInfoId'});
    }
  }
  SubscriptionUserRelation.init(
    {
      subscriptionUserId: {
        type: DataTypes.INTEGER,
        comment: '地址信息id',
        field:'SubscriptionUserId'
      },
      carpoolInfoId: {
        type: DataTypes.INTEGER,
        comment: '订阅拼车信息id',
        field:'CarpoolInfoId'
      }
    },
    {
    // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: 'SubscriptionUserRelation', // 我们需要选择模型名称
      paranoid: true
    }
  );

  return SubscriptionUserRelation;
};
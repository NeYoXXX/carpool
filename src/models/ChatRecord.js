'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class ChatRecord extends Model {
    static associate(db){
      db.User.hasMany(ChatRecord,{
        onDelete:'',
        onUpdate:'',
        constraints:false,
        foreignKey: 'reSubUserId'
      });
      ChatRecord.belongsTo(db.User,{
        onDelete:'',
        onUpdate:'',
        constraints:false
      });
      db.CarpoolInfo.hasMany(ChatRecord,{
        onDelete:'',
        onUpdate:'',
        constraints:false,
        foreignKey: 'carpoolInfoId'
      });
      ChatRecord.belongsTo(db.CarpoolInfo,{
        onDelete:'',
        onUpdate:'',
        constraints:false
      });
    }
  }
  ChatRecord.init(
    {
      chatRecord: {
        type: DataTypes.TEXT,
        comment: '聊天内容'
      },
      carpoolInfoId: {
        type: DataTypes.INTEGER,
        comment: '订阅拼车信息id',
        field:'CarpoolInfoId'
      },
      reSubUserId: {
        type: DataTypes.INTEGER,
        comment: '发送聊天内容用户id',
        field:'ReSubUserId'
      }
    },
    {
    // 这是其他模型参数
      sequelize, // 我们需要传递连接实例
      modelName: 'ChatRecord', // 我们需要选择模型名称
      paranoid: true
    }
  );


  return ChatRecord;
};
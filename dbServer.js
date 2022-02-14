import { Sequelize, DataTypes, Model } from 'sequelize'
const sequelize = new Sequelize('carpool', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

class Place extends Model {}

Place.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题',
      validate: {
        notNull: true,
      },
    },
    describe: {
      type: DataTypes.STRING,
      comment: '最后一条数据',
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'Place', // 我们需要选择模型名称
    paranoid: true,
  },
)

class User extends Model {}
User.init(
  {
    weixinName: {
      type: DataTypes.STRING,
      comment: '微信名称',
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    weixinHeadPortrait: {
      type: DataTypes.STRING,
      comment: '微信头像',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
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
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'User', // 我们需要选择模型名称
    paranoid: true,
  },
)

class CarpoolInfo extends Model {}
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
        isIn: [0, 1],
        notNull: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
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
          args: [true, false],
          msg: '必须为true或false',
        },
      },
    },
    releaseUserId: {
      type: DataTypes.INTEGER,
      comment: '发布人id',
      references:{
        model:User,
        key: 'id'
      }
    },
    placeId: {
      type: DataTypes.INTEGER,
      comment: '地址信息id',
      references:{
        model:Place,
        key:'id'
      }
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'CarpoolInfo', // 我们需要选择模型名称
    paranoid: true,
  },
)
Place.hasMany(CarpoolInfo,{
  foreignKey: 'placeId'
})
// CarpoolInfo.belongsTo(Place)
User.hasMany(CarpoolInfo,{
  foreignKey: 'releaseUserId'
})
// CarpoolInfo.belongsTo(User)

class SubscriptionUserRelation extends Model {}
SubscriptionUserRelation.init(
  {
    subscriptionUserId: {
      type: DataTypes.INTEGER,
      comment: '地址信息id',
      references:{
        model:User,
        key:'id'
      }
    },
    carpoolInfoId: {
      type: DataTypes.INTEGER,
      comment: '订阅拼车信息id',
      references:{
        model:CarpoolInfo,
        key:'id'
      }
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'SubscriptionUserRelation', // 我们需要选择模型名称
    paranoid: true,
  },
)
User.hasMany(SubscriptionUserRelation,{foreignKey: 'subscriptionUserId'})
CarpoolInfo.hasMany(SubscriptionUserRelation,{foreignKey: 'carpoolInfoId'})

class ChatRecord extends Model {}
ChatRecord.init(
  {
    chatRecord: {
      type: DataTypes.TEXT,
      comment: '聊天内容',
    },
    carpoolInfoId: {
      type: DataTypes.INTEGER,
      comment: '订阅拼车信息id',
      references:{
        model:CarpoolInfo,
        key:'id'
      }
    },
    reSubUserId: {
      type: DataTypes.INTEGER,
      comment: '发送聊天内容用户id',
      references:{
        model:User,
        key: 'id'
      }
    },
  },
  {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'ChatRecord', // 我们需要选择模型名称
    paranoid: true,
  },
)

User.hasMany(ChatRecord,{
  foreignKey: 'reSubUserId'
})
// ChatRecord.belongsTo(User)
CarpoolInfo.hasMany(ChatRecord,{
  foreignKey: 'carpoolInfoId'
})
// ChatRecord.belongsTo(CarpoolInfo)
const db ={}
db['Place'] = Place
db['User'] = User
db['CarpoolInfo'] = CarpoolInfo
db['SubscriptionUserRelation'] = SubscriptionUserRelation
db['ChatRecord'] = ChatRecord

export default db

// async function main(){
//   try {
//     await sequelize.sync({ force: true });
//   } catch (error) {
//     console.log(error);
//   }
//   console.log("所有模型均已成功同步.");
// }
// if(require.main === module){
//   main()
// }


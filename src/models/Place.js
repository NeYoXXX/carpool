'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
  return Place;
};
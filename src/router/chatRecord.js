import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';

export default new Router()
  .get('/',
    validator({
      query: Joi.object().keys({
        userId:Joi.number().integer().min(1).required(),
        carpoolInfoId:Joi.number().integer().min(1).required()
      })
    }),
    async ctx=>{
      // const [carpoolIns,userIns] = await Promise.all([
      //   ctx.db.CarpoolInfo.findByPk(ctx.query.carpoolInfoId),
      //   ctx.db.User.findByPk(ctx.query.userId)
      // ]);

      const carpoolIns = await ctx.db.CarpoolInfo.findByPk(ctx.query.carpoolInfoId);
      // 如果user是发布者
      if (carpoolIns.releaseUserId === ctx.query.userId){
        const subscriptionIns = await ctx.db.SubscriptionUserRelation.findAll({
          where:{
            subscriptionUserId:ctx.query.userId,
            carpoolInfoId:ctx.query.carpoolInfoId
          }
        });
      }
      if (subscriptionIns.length > 0){
        console.log(subscriptionIns.map(item=>item.subscriptionUserId));
        const carpoolIns = await ctx.db.CarpoolInfo.findByPk(ctx.query.carpoolInfoId);
        // 如果user是发布者
        if (carpoolIns.releaseUserId === ctx.query.userId){
          const res = await ctx.db.User.findAll({
            where:{
              id:{
                [ctx.db.Sequelize.Op.or]:subscriptionIns.map(item=>item.subscriptionUserId)
              },
              carpoolInfoId:ctx.query.carpoolInfoId
            }
          });
          ctx.status = 200;
          ctx.body = res;
          return;
        }


        // 如果user是订阅者
        let dbQuery = [carpoolIns.releaseUserId,ctx.query.userId];
        const res = await ctx.db.ChatRecord.findAll({
          where:{
            reSubUserId:{
              [ctx.db.Sequelize.Op.or]:dbQuery
            },
            carpoolInfoId:ctx.query.carpoolInfoId
          }
        });
        ctx.status = 200;
        ctx.body = res;
      } else {
        ctx.status = 200;
        ctx.body = [];
      }


    })
  .post('/',
    validator({
      body: Joi.object().keys({
        chatRecord:Joi.string().min(1).required(),
        userId:Joi.number().integer().min(1).required(),
        carpoolInfoId:Joi.number().integer().min(1).required()
      })
    }),
    async ctx=>{
      try {
        await Promise.all([
          ctx.db.SubscriptionUserRelation.findOrCreate({
            where:{
              carpoolInfoId:ctx.request.body.carpoolInfoId,
              subscriptionUserId:ctx.request.body.userId
            }
          }),
          ctx.db.ChatRecord.create({
            chatRecord:ctx.request.body.chatRecord,
            carpoolInfoId:ctx.request.body.carpoolInfoId,
            reSubUserId:ctx.request.body.userId
          })
        ]);
        ctx.status=201;
        ctx.body = 'success';
      } catch (error) {
        ctx.throw(500, 'fail',{detail:error});
      }


    });
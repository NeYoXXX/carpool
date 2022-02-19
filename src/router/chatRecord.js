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
    ctx=>{
      const carpoolIns = ctx.db.CarpoolInfo.findByPK(ctx.query.carpoolInfoId);
      const res = ctx.db.ChatRecord.findAll({
        where:{
          reSubUserId:{
            [ctx.db.Sequelize.Op.or]:[carpoolIns.releaseUserId,ctx.query.userId]
          },
          carpoolInfoId:ctx.query.carpoolInfoId
        }
      });
      ctx.status = 200;
      ctx.body = res;
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
              carpoolInfoId:ctx.query.carpoolInfoId,
              subscriptionUserId:ctx.query.userId
            }
          }),
          ctx.db.SubscriptionUserRelation.created({
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
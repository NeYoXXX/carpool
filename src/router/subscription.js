import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';

export default new Router()
  .post('/',
    validator({
      body: Joi.object().keys({
        userId:Joi.number().integer().min(1).required(),
        carpoolInfoId:Joi.number().integer().min(1).required()
      })
    }),
    ctx=>{
      const userIns = ctx.db.userId.findByPK(ctx.request.body.userId);
      const carpoolIns = ctx.db.CarpoolInfo.findByPK(ctx.request.body.userId);
      if (userIns & carpoolIns){
        ctx.db.SubscriptionUserRelation.create({
          subscriptionUserId:ctx.request.body.userId,
          carpoolInfoId:ctx.request.body.carpoolInfoId
        });
      } else {
        ctx.throw(400, 'userId或carpoolInfoId不存在');
      }
    }
  );
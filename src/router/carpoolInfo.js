import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';

let carpoolinfoRouter = new Router()
  .get('/',
    validator({
      query: Joi.object().keys({
        placeId: Joi.number().integer().min(1).required()
      })
    }),
    async (ctx) => {
      const res = await ctx.db.CarpoolInfo.findAll({
        where: {
          createdAt:
          placeId: ctx.query.placeId
        }
      });
      ctx.status = 200;
      ctx.body = res;
    })
  .post('/',
    validator({
      body: Joi.object().keys({
        departureTime: Joi.date().greater('now').required(),
        startingPoint: Joi.string().max(50).required(),
        end: Joi.string().max(50).required(),
        waypoint: Joi.string().max(200),
        infoType: Joi.number().integer().min(0).max(1).required(),
        phoneNumber: Joi.string().max(15).required(),
        isCancel: Joi.boolean(),
        placeId: Joi.number().integer().min(1).required(),
        releaseUserId: Joi.number().integer().min(1).required()
      })

    }),
    async (ctx) => {
      try {
        console.log(ctx.request.body);
        if (ctx.request.body.isCancel === undefined) {
          ctx.request.body.isCancel = false;
        }
        const ins = await ctx.db.CarpoolInfo.create({
          departureTime: ctx.request.body.departureTime,
          startingPoint: ctx.request.body.startingPoint,
          end: ctx.request.body.end,
          waypoint: ctx.request.body.waypoint,
          infoType: ctx.request.body.infoType.toString(),
          phoneNumber: ctx.request.body.phoneNumber,
          isCancel: ctx.request.body.isCancel,
          placeId: ctx.request.body.placeId,
          releaseUserId: ctx.request.body.releaseUserId
        });
        console.log(ins);
      } catch (error) {
        console.log(error, 'error-CarpoolInfo');
      }

      ctx.status = 201;
      ctx.body = { msg: 'success' };
    });
export default carpoolinfoRouter;

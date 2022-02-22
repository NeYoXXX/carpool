import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';

let userRouter = new Router()
  .get('/:id',
    validator({
      params: Joi.object().keys({
        id: Joi.number().integer().required()
      })
    }),
    async (ctx) => {
      const project = await ctx.db.User.findByPk(ctx.params.id);
      ctx.status = 200;
      ctx.body = project;
    })
  .post('/',
    validator({
      body: Joi.object().keys({
        weixinName: Joi.string().max(50).required(),
        weixinHeadPortrait: Joi.string().max(200),
        phoneNumber: Joi.string().max(15).required()
      })

    }),
    async (ctx) => {
      try {
        const userIns = await ctx.db.User.create({
          weixinName: ctx.request.body.weixinName,
          weixinHeadPortrait: ctx.request.body.weixinHeadPortrait,
          phoneNumber: ctx.request.body.phoneNumber
        });
        ctx.status = 201;
        ctx.body = userIns;
      } catch (error) {
        console.log(error);
      }


    });
export default userRouter;

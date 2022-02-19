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
      console.log(project);
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
    (ctx) => {
      try {
        ctx.db.User.create({
          weixinName: ctx.request.body.weixinName,
          weixinHeadPortrait: ctx.request.body.weixinHeadPortrait,
          phoneNumber: ctx.request.body.phoneNumber
        });
      } catch (error) {
        console.log(error);
      }


      ctx.status = 201;
      ctx.body = { msg: 'success' };
    });
export default userRouter;

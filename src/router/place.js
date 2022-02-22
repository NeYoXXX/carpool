import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';

let placeRouter = new Router()
  .get('/',
    async (ctx) => {
      ctx.status = 200;
      ctx.body = await ctx.db.Place.findAll();
    })
  .post('/',
    validator({
      body: Joi.object().keys({
        title: Joi.string().required()
      })
    }),
    async (ctx) => {
      let placeIns = await ctx.db.Place.create({
        title: ctx.request.body.title,
        describe: ctx.request.body.describe
      });
      ctx.status = 201;
      ctx.body = placeIns;
    });

export default placeRouter;

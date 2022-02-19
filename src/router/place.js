import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';

let placeRouter = new Router()
  .get('/',
    (ctx) => {
      ctx.body = ctx.db.Place.findAll();
      ctx.status = 200;
    })
  .post('/',
    validator({
      body: Joi.object().keys({
        title: Joi.string().required()
      })
    }),
    (ctx) => {
      ctx.db.Place.create({
        title: ctx.request.body.title,
        describe: ctx.request.body.describe
      });
      ctx.status = 201;
      ctx.body = { msg: 'success' };
    });

export default placeRouter;

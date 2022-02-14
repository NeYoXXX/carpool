import Router from 'koa-router'
import validator, { Joi } from 'koa-context-validator';

let placeRouter = new Router()
    .get('/:username', 
    validator({
        params: Joi.object().keys({
            username: Joi.string().required(),
        }),
    }),async (ctx)=>{

        // console.log(ctx.db.Place.findAll());
        ctx.body =  await ctx.db.Place.findAll()
    })


let router = new Router({
    prefix: '/api'
})
router.use('/place',placeRouter.routes(),placeRouter.allowedMethods())

export default router
import placeRouter from './place';
import userRouter from './user';
import carpoolinfoRouter from './carpoolInfo';
import subscriptionRouter from './subscription';
import chatrecordRouter from './chatRecord';
import Router from 'koa-router';

let router = new Router({
  prefix: '/api'
});
router.use('/place', placeRouter.routes(), placeRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/carpoolinfo', carpoolinfoRouter.routes(), carpoolinfoRouter.allowedMethods());
router.use('/subscription', subscriptionRouter.routes(), subscriptionRouter.allowedMethods());
router.use('/chatrecord', chatrecordRouter.routes(), chatrecordRouter.allowedMethods());

export default router;
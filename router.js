const Router = require('koa-router')

const {objMapDBField} = require('./utils')
const {selectAllPlaceData,insertCarpoolInfo,selectCarpoolInfo,insertUser,selectUser,selectSubscription,selectChatRecordTow,insertChatRecord,insertSubscription} = require('./db-pool')

let placeRouter = new Router()
    .get('/', async (ctx)=>{
        let placeData=await selectAllPlaceData()
        ctx.body = placeData
    })

let carpoolInfoRouter = new Router()
    .get('/list/:placeId',async (ctx)=>{
        let fieldObj = objMapDBField('CarpoolInfo',ctx.params)
        let carpoolInfo=await selectCarpoolInfo(Object.keys(fieldObj),Object.values(fieldObj))
        ctx.status = 200
        ctx.body = carpoolInfo
    })
    .get('/:releaseUserId',async (ctx)=>{
        let carpoolInfoList = await selectCarpoolInfo(['release_user_id'],ctx.params.releaseUserId)
        ctx.status = 200
        ctx.body = carpoolInfoList
    })
    .post('/', async (ctx)=>{
        try {
            if(!ctx.request.body.releaseUserId || !ctx.request.body.placeId){
                ctx.status = 400
                ctx.body = {msg:'fail',detail:'必须有release_user_id和place_id参数'}
                return
            }
            let fieldObj = objMapDBField('CarpoolInfo',ctx.request.body)
            await insertCarpoolInfo(Object.keys(fieldObj),Object.values(fieldObj))
            ctx.status = 202
            ctx.body = {msg:'success',detail:'添加成功'}
        } catch (error) {
            ctx.status = 500
            ctx.body = {msg:'fail',detail:error}
        }
    })

let userRouter = new Router()
    .get('/:id',async (ctx)=>{
        let fieldObj = objMapDBField('User',ctx.params)
        let user=await selectUser(Object.keys(fieldObj),Object.values(fieldObj))
        ctx.status = 200
        ctx.body = user
    })
    .post('/', async (ctx)=>{
        try {
            let fieldObj = objMapDBField('User',ctx.request.body)
            let userData=await insertUser(Object.keys(fieldObj),Object.values(fieldObj))

            ctx.status = 202
            ctx.cookies.set('userId', userData.insertId)
            ctx.body = {msg:'success',msgDetail:'添加成功',other:userData}
        } catch (error) {
            ctx.body = {msg:'fail',detail:error}
            ctx.status = 500
        }
    })

let chatRecordRouter = new Router()
    .get('/list/:carpoolInfoId/:userId', async (ctx)=>{
        // 拼车信息
        let carpoolInfo = await selectCarpoolInfo(['id'],[ctx.params.carpoolInfoId])
        
        if(carpoolInfo['release_user_id'] === ctx.params.userId){
            // 发布者
            ctx.status = 400
            ctx.body = {msg:'fail',msgDetail:'carpoolInfoId参数应该为拼车信息id，userId参数应该为订阅者id',data:chatRecordList}

        }else{
            // 订阅者
            // 获取全部聊天记录，拼车信息、发布人、订阅人
            let chatRecordList = await selectChatRecordTow(ctx.params.carpoolInfoId,carpoolInfo['release_user_id'],ctx.params.userId)
            
            ctx.status = 200
            ctx.body = {msg:'success',msgDetail:'操作成功',data:chatRecordList}
        }
    })
    .post('/', async (ctx)=>{
        if(!ctx.request.body.reSubUserId && !ctx.request.body.carpoolInfoId){
            ctx.status = 400
            ctx.body = {msg:'fail',msgDetail:'reSubUserId和carpoolInfoId参数出错'}
            return
        }
        let fieldObj = objMapDBField('ChatRecord',ctx.request.body)
        let res = await insertChatRecord(Object.keys(fieldObj),Object.values(fieldObj))
        let subscriptionInfo = await selectSubscription(['subscription_user_id','carpool_info_id'],[ctx.request.body.reSubUserId,ctx.request.body.carpoolInfoId])
        if(Array.isArray(subscriptionInfo)){
            if(subscriptionInfo.length === 0){
                // TODO:不需要使用await
                await insertSubscription(['subscription_user_id','carpool_info_id'],[ctx.request.body.reSubUserId,ctx.request.body.carpoolInfoId])
                // ctx.status = 500
                // ctx.body = {msg:'fail',msgDetail:'订阅操作失败'}
            }
        }
        ctx.status = 200
        ctx.body = {msg:'success',msgDetail:'操作成功',data:res}
    })


let router = new Router({
    prefix: '/api'
})
router.use('/place',placeRouter.routes(),placeRouter.allowedMethods())
router.use('/carpool',carpoolInfoRouter.routes(),carpoolInfoRouter.allowedMethods())
router.use('/user',userRouter.routes(),userRouter.allowedMethods())
router.use('/chatrecord',chatRecordRouter.routes(),chatRecordRouter.allowedMethods())
// router.use('/releasecarpool/list',chatRecordRouter.routes(),chatRecordRouter.allowedMethods())

module.exports = router
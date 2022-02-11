
// 代码和表中字段映射关系
const CarpoolInfoDBCodeField = {
    'id':'id',
    'departureTime':'departure_time',
    'releaseTime':'release_time',
    'startingPoint':'starting_point',
    'end':'end',
    'waypoint':'waypoint',
    'infoType':'info_type',
    'phoneNumber':'phone_number',
    'isCancel':'is_cancel',
    'releaseUserId':'release_user_id',
    'placeId':'place_id'
}

const UserDBCodeField = {
    'id':'id',
    'weixinName':'weixin_name',
    'weixinHeadPortrait':'weixin_head_portrait',
    'phoneNumber':'phone_number'
}


const SubscriptionDBCodeField={
    'id':'id',
    'subscriptionTime':'subscription_time',
    'isCancel':'is_cancel',
    'subscriptionUserId':'subscription_user_id',
    'carpoolInfoId':'carpool_info_id'
}

const ChatRecordDBCodeField = {
    'id':'id',
    'chatRecord':'chat_record',
    'time':'time',
    'carpoolInfoId':'carpool_info_id',
    'reSubUserId':'re_sub_user_id',
    'isCancel':'is_cancel'
}


/**
 * 代码和表中字段映射关系
 * @param {*} type 表类型
 * @param {*} obj 原数据
 * @returns 映射完成object
 */
function objMapDBField (type,obj){
    let resObj = {}
    let DBCodeField = null
    switch (type) {
        case 'CarpoolInfo':
            DBCodeField = CarpoolInfoDBCodeField
            break;
        case 'User':
            DBCodeField = UserDBCodeField
            break;
        case 'Subscription':
            DBCodeField = SubscriptionDBCodeField
            break
        case 'ChatRecord':
            DBCodeField = ChatRecordDBCodeField
            break
    }
    if(DBCodeField){
        Object.keys(obj).forEach(key=>{
            if(obj[key]) {
                resObj[DBCodeField[key]] = obj[key]
            }
        })
    }
    return resObj
}

module.exports={objMapDBField}
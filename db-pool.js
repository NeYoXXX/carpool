const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  'localhost',
  user     :  'root',
  password :  '123456',
  database :  'carpool'
})

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
        })
      }
      connection.release()
    })
  })
}

async function selectAllPlaceData() {
  let sql = 'SELECT * FROM place;'
  let dataList = await query( sql )
  return dataList
}

async function insertCarpoolInfo(names,values){
  try {
    let sql = `INSERT INTO carpool.carpool_info 
    (${names.toString()}) 
    VALUES(${names.map(()=>'?').toString()});`
    let dataList = await query(sql,values)
    return dataList
  } catch (error) {
    throw error
  }
}

async function selectCarpoolInfo(names,values){
  let sql = 'SELECT * FROM carpool.carpool_info'
  names.forEach((item,index) => {
    if(index === 0) sql += ` WHERE ${item}=?`
    else sql += ` AND ${item}=?`
  });
  
  let dataList = await query(sql,values)
  return dataList
}

async function selectUser(names,values){
  let sql = 'SELECT * FROM carpool.user'
  names.forEach((item,index) => {
    if(index === 0) sql += ` WHERE ${item}=?`
    else sql += ` AND ${item}=?`
  });
  let dataList = await query( sql,values )
  return dataList
}

async function insertUser(names,values){
  try {
    let sql = `INSERT INTO carpool.user
    (${names.toString()}) 
    VALUES(${names.map(()=>'?').toString()});`
    let dataList = await query(sql,values)
    return dataList
  } catch (error) {
    throw error
  }
}

async function insertChatRecord(names,values){
  try {
    let sql =`INSERT INTO carpool.chat_record
    (${names.toString()}) 
    VALUES(${names.map(()=>'?').toString()});`
    let dataList = await query(sql,values)
    return dataList
  } catch (error) {
    throw error
  }
}

async function selectChatRecord(names,values){
  let sql = 'SELECT * FROM carpool.chat_record'
  names.forEach((item,index) => {
    if(index === 0) sql += ` WHERE ${item}=?`
    else sql += ` AND ${item}=?`
  });
  let dataList = await query( sql,values )
  return dataList
}

async function insertSubscription(names,values){
  try {
    let sql =`INSERT INTO carpool.subscription_user_relation
    (${names.toString()}) 
    VALUES(${names.map(()=>'?').toString()});`
    let dataList = await query(sql,values)
    return dataList
  } catch (error) {
    throw error
  }
}

async function selectSubscription(names,values){
  let sql = 'SELECT * FROM carpool.subscription_user_relation'
  names.forEach((item,index) => {
    if(index === 0) sql += ` WHERE ${item}=?`
    else sql += ` AND ${item}=?`
  });
  let dataList = await query( sql,values )
  return dataList
}

async function selectChatRecordTow(carpoolInfoId,reSubUserId,userId){
  let sql = 'SELECT * FROM carpool.subscription_user_relation WHERE carpool_info_id=? AND (re_sub_user_id=? OR re_sub_user_id=?)'
  let dataList = await query( sql,[carpoolInfoId,reSubUserId,userId] )
  return dataList
}


module.exports = {selectAllPlaceData,insertCarpoolInfo,selectCarpoolInfo,insertUser,selectUser,selectSubscription,selectChatRecordTow,insertChatRecord,insertSubscription}
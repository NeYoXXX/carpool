const db = require('./models/index')

async function main(){
  try {
    await db.sequelize.sync({ force: true });
    console.log("所有模型均已成功同步.");
  } catch (error) {
    console.log(error);
  }
}
if(require.main === module){
  main()
}


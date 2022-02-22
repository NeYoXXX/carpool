import http from 'http';
import https from 'https';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from './logger';
import router from './router';
import db from './models';
const app = new Koa();

app.log = logger;
app.context.db=db;

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.on('error', err => {
  console.error('server error', err);
});

// app.listen(3000,()=>{
//   app.log.info('服务已启动，端口3000');
// });

http.createServer(app.callback()).listen(3000,()=>{
  app.log.info('http服务 端口3000');
});
https.createServer(app.callback()).listen(3001,()=>{
  app.log.info('https服务 端口3001');
});

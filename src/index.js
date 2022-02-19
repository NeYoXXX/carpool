import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './router/router';
import db from './models';

const app = new Koa();
app.context.db=db;

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.on('error', err => {
  console.error('server error', err);
});

app.listen(3000);

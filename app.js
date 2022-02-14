import Koa from 'koa'
const app = new Koa()
import bodyParser from 'koa-bodyparser'
import router from './router'

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})
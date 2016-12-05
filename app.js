import Koa from 'koa';
import logger from 'koa-logger';
import KoaRouter from 'koa-router';
import Config from './config';

const router = KoaRouter();
const app = new Koa();
const config = {bind: process.env.APP_BIND || 8090};


app.use(logger());
app.use(async (ctx, next) => {
  ctx.body = 'hello world';
})

app.listen(config.bind, () => {
  console.log('Server running on port:' + config.bind);
});
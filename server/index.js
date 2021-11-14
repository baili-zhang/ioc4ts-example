const Koa = require("koa");
const Router = require("@koa/router");
const path = require("path");
const app = new Koa();
const router = new Router();

router.get("/user", (ctx, next) => {
  ctx.body = { name: "ioc4ts" };
});

app.use(require('koa-static')(path.join(__dirname) + '/static'))

app.use(router.routes()).listen(3000, () => {
  console.log('Server is running at port 3000 !')
});

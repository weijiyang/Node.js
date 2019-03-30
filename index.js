const path = require('fs');
const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();

const views = require('koa-views');
const superagent = require('superagent');
const cheerio = require('cheerio');

app.use(views(path.join(__dirname, './views'), { extension: 'ejs' }));
app.use(async (ctx) => {
    await ctx.render('user')
})

app.listen(3000, function(){
    console.log('项目已启动： http://localhost:3000');
});
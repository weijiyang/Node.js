const Koa = require('koa');
const Route = require('koa-router');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const ejs = require('ejs');
const app = new Koa();
const router = new Route();
const db = require('./mongoose.js');
const routeSync = function (ctx) {
    return new Promise((response, reject) => {
        let template = ejs.compile(fs.readFileSync('./template/todolist.ejs', 'utf8'));
        let data = {
            title: 'TODO - LIST'
        };
        let html = template(data);
        ctx.body = html;
        response(true);
    });
};
router.get('/', routeSync);
router.post('/search', ctx => {
    let param = ctx.request.body;
    return new Promise((resolve, reject) => {
        db.get(param.text).then(res => {
            ctx.body = res || [];
            resolve(true);
        }).catch(err => {
            console.log(err);
            reject(false);
        });
    });
});
router.post('/add', ctx => {
    let param = ctx.request.body;
    return new Promise((resolve, reject) => {
        db.insert(param).then(res => {
            ctx.body = {};
            resolve(true);
        }).catch(err => {
            console.log(err);
            reject(false);
        });
    });
});
router.post('/delete', ctx => {
    let param = ctx.request.body;
    return new Promise((resolve, reject) => {
        db.del(param.id).then(res => {
            ctx.body = {};
            resolve(true);
        }).catch(err => {
            console.log(err);
            reject(false);
        });
    });
});
router.post('/update', ctx => {
    let param = ctx.request.body;
    return new Promise((resolve, reject) => {
        db.update(param.id).then(res => {
            ctx.body = {};
            resolve(true);
        }).catch(err => {
            console.log(err);
            reject(false);
        });
    });
});
app.use(bodyparser());
app.use(router.routes());
console.log('todolist 服务启动成功： http://localhost:3000');
app.listen(3000);

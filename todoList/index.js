const Koa = require('koa');
const Route = require('koa-router');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const ejs = require('ejs');
const app = new Koa();
const router = new Route();
let id = 5;
let baseList = [
    { id: 1, title: '一致性 Consistency', desc: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；', isFinished: true },
    { id: 2, title: '一致性 Consistency', desc: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；', isFinished: true },
    { id: 3, title: '一致性 Consistency', desc: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；', isFinished: false },
    { id: 4, title: '一致性 Consistency', desc: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；', isFinished: false }
];
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
    return new Promise((response, reject) => {
        // 模拟模糊搜索
        setTimeout(function () {
            ctx.body = baseList.filter(item => {
                return JSON.stringify(item).indexOf(param.text) > -1;
            });
            response(true);
        }, 2000);
    });
});
router.post('/add', ctx => {
    let param = ctx.request.body;
    return new Promise((response, reject) => {
        setTimeout(function () {
            baseList.push({
                id: id++,
                title: param.title,
                desc: param.desc,
                isFinished: param.isFinished || false
            });
            ctx.body = {};
            response(true);
        }, 1000);
    });
});
router.post('/delete', ctx => {
    let param = ctx.request.body;
    return new Promise((response, reject) => {
        setTimeout(function () {
            baseList = baseList.filter(item => {
                return item.id != param.id;
            });
        }, 500);
        ctx.body = {};
        response(true);
    });
});
app.use(bodyparser());
app.use(router.routes());
console.log('todolist 服务启动成功： http://localhost:3000');
app.listen(3000);

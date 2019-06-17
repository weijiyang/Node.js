// const schedule = require('node-schedule');
const ejs = require('ejs');
const fs = require('fs');
const route = require('koa-route');
const Koa = require('koa');
const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const app = new Koa();

function setEjs (ctx) {
    return new Promise((resolve, reject)=> {
        let itemLists = [];
        axios.get('http://wufazhuce.com/').then(res => {
            let $ = cheerio.load(res.data, {
                ignoreWhitespace: true,
                xmlMode: true
            });
            let src = $('.carousel-inner  .fp-one-imagen');
            let title = $('.carousel-inner .fp-one-cita-wrapper .fp-one-cita a');
            for (let index = 0; index < src.length ; index++) {
                let i = {imgUrl: src[index].attribs.src, title: title[index].children[0].data || '获取失败', href: title[index].attribs.href||'获取失败'};
                itemLists.push(i);
                // console.log(src[index].attribs.src, title[index].children[0].data, title[index].attribs.href);
            }
            console.log(JSON.stringify(itemLists));
            let template = ejs.compile(fs.readFileSync('template.ejs', 'utf8'));
            let html = template({itemLists: itemLists, title: '获取ONE图片信息'});
            ctx.body = html;
            resolve(itemLists);
        }).catch(err => {
            console.log(chalk.red(err));
            reject(err);
        });
    });
}


app.use(route.get('/', setEjs));
app.listen(3000);

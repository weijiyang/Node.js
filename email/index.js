// qq邮箱授权码一天一变……
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '845612246@qq.com',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: 'swbzjflpmlwubcjd',
    }
});

const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'mail.ejs'), 'utf-8'));
const html = template({
    title: 'TITLE',
    desc: 'DESC CONTENT'
});
let mailOptions = {
    from: '"测试" <845612246@qq.com>', // sender address
    to: 'crawling_snail@163.com', // list of receivers
    subject: 'Hello', // Subject line
    // 发送text或者html格式
    // text: 'Hello world?', // plain text body
    html: html // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
});

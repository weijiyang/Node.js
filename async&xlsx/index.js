const xlsx = require('xlsx');
const async = require('async');
const axios = require('axios');
const chalk = require('chalk')

const gitController = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 5000
})

function getAllRepos() {
  return axios.get('https://api.github.com/users/weijiyang/repos?per_page=100&page=1').then(res => {
    return res.data.map(item => {
      return {
        name: item.name,
        description: item.description,
        html_url: item.html_url
      }
    })
  }).catch(err => {
    console.log(chalk.red(err))
  })
}

function writeXlsx(urls) {
  // async.mapLimit(urls, 5, async function (url) {
  //   const response = await fetch(url)
  //   return response.body
  // }, (err, results) => {
  //   if (err) throw err
  //   // results is now an array of the response bodies
  //   console.log(results)
  // })
  let json = urls
  let ss = xlsx.utils.json_to_sheet(json); //通过工具将json转表对象
  let keys = Object.keys(ss).sort(); //排序 [需要注意，必须从A1开始]

  let ref = keys[1] + ':' + keys[keys.length - 1]; //这个是定义一个字符串 也就是表的范围[A1:C5]

  let workbook = { //定义操作文档
    SheetNames: ['nodejs-sheetname'], //定义表明
    Sheets: {
      'nodejs-sheetname': Object.assign({}, ss, {
        '!ref': ref
      }) //表对象[注意表明]
    },
  };

  xlsx.writeFile(workbook, './temp.xls');
}

async function init () {
  let urls = await getAllRepos()
  writeXlsx(urls)
}

init()

const router = require('koa-router')()
const pool = require('../db/pool/pool.js');
router.post('/saveHotSpot.do',(ctx, next) => {
  //let connection = pool.getConnection();
    let body = ctx.request.body;
    console.log(body);
    let {data} = body;
    if(!data){
      ctx.body = {
        code : 500,
        status : false,
        message : "data不可以为空"
      }
      return
    }
    next()
}, async (ctx,next) => {
    let hasError = false;
    try {
        let {data} = ctx.request.body;
        data = typeof data === 'string' ? JSON.parse(data) : data;
        data.forEach((item) => {
            const {title, link, platform} = item;
            let infoTime = new Date().getTime();
            pool.getConnection(function (err, connection) {
                connection.query("insert into HOT_INFORMATION set Title=?,Link=?,Platform=?,InfoTime=?;", [title, link, platform, infoTime], function (err, data) {
                    if (err) {
                        console.log(err);
                        hasError = true;
                    }
                })
            });
        });
  }catch (e){
      console.log(e);
      hasError = true;
  }
    if(hasError) {
        ctx.body = {
            code : 500,
            status : false,
            message : "系统繁忙"
        }
    }else{
        ctx.body = {
            code : 200,
            status : true,
            message : "上传成功"
        }
    }
});


module.exports = router

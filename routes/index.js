const router = require('koa-router')()
const pool = require('../db/pool/pool.js');
const {success,failure} = require('../lib/responseResult');
const {query} = require('../lib/query')
router.post('/saveHotSpot.do',async (ctx, next) => {
  //let connection = pool.getConnection();
    let body = ctx.request.body;
    let {data} = body;
    if(!data){
      ctx.body = {
        code : 500,
        status : false,
        message : "data不可以为空"
      };
      return
    }
    await next()
}, async (ctx,next) => {
    let res = {};
    try {
        let sql = "insert into HOT_INFORMATION set Title=?,Link=?,Platform=?,InfoTime=?;";
        let {data} = ctx.request.body;
        data = typeof data === 'string' ? JSON.parse(data) : data;
        for (let item of data) {
            const {title = '', link = '', platform = ''} = item;
            let infoTime = new Date().getTime();
            await query(sql, [title, link, platform, infoTime]).then(function (result) {
                console.log(result);
                res = success(result);
                ctx.result = res;
                next()
            });
        }
    }catch (e){
        res = failure(e);
        ctx.result = res;
        next()
    }
},async (ctx,next)=>{
    ctx.body = ctx.result;
});



router.get('/getHotSpot.do',async (ctx,next) => {
    let res = {};
    let param = ctx.request.query;
    const {title,link,platform} = param;
    try {
        //let sql = `select * from HOT_INFORMATION where ${title ? 'Title=?,' : ''}${link ? 'Link=?,' : ''}${platform ? 'Platform=?' : ''};limit 50`;
        let filterString = '';
        if(title != null){
            filterString+='Title=?';
        }
        if(link != null){
            filterString && (filterString+=',')
            filterString += 'Link=?'
        }
        if(platform != null){
            filterString && (filterString+=',')
            filterString += 'Platform=?'
        }
        let sql = `select * from HOT_INFORMATION ${filterString ? `where ${filterString}` : ''} limit 50`;
        let result = await query(sql,[title,link,platform]).then(queryResult=>{
            return queryResult
        }).catch(err=>{
            res = failure(err);
        });
        if(result){
            res = success({data : result});
        }
    }catch (e){
        res = failure(e);
    }
    ctx.body = res;
});
module.exports = router

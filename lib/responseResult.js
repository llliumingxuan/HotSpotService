const success = function (res={}) {
    let result = {
        code : 200,
        status : true,
        message : '成功'
    }
    if(res.message){
        Object.assign(result,{
            message : res.message
        })
    }
    if(res.data){
        Object.assign(result,{
            data : res.data
        })
    }
    return result
};

const failure = function (error={}) {
    let result = {
        code : 500,
        status : false,
        message : '系统繁忙'
    };
    if(error.code && typeof code === 'number'){
        Object.assign(result,{
            code : error.code
        })
    }
    if(error.message){
        Object.assign(result,{
            message : error.message
        })
    }
    console.log(error);
    return result
};

module.exports = {
    success,
    failure
}
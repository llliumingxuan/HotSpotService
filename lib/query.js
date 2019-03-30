const pool = require('../db/pool/pool.js');
const query = function (sql, value) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if(err){
                reject(err);
            }
            connection.query(sql, value, function (err, data) {
                console.log(err);
                if (err) {
                    console.log(err);
                    reject(err)
                }
                resolve(data);
            })
        })
    })
};

module.exports = {
    query
}
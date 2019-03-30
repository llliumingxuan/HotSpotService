const test = false;

const dbConfig = {
    HOST : '120.27.4.196',
    USER : 'root',
    PASSWORD : '0000',
    PORT : 3306,
    DATABASE : test ? 'HOTSPOTTEST' :'HOTSPOT'
}


module.exports = dbConfig
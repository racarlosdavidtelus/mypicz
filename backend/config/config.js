require('dotenv').config()

const credentials = {
    mysql: {   
        host     : `${process.env.MYSQL_HOST}`,
        user     : `${process.env.MYSQL_USER}`,
        password : `${process.env.MYSQL_PASSWORD}`,
        database : `${process.env.MYSQL_DATABASE}`   
    },
    bucket: {
        storage: `${process.env.GOOGLE_APPLICATION_CREDENTIALS}`
    }
}

module.exports = credentials;
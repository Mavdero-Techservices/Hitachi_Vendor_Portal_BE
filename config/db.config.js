module.exports = {
    HOST: "db4free.net",
    USER: "mavdero",
    PASSWORD: "test1234",
    DB: "mavdero",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

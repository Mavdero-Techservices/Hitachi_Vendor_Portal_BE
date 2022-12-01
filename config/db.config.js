module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "test12345",
    DB: "mavdero",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

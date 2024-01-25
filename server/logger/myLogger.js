const winston = require('winston');

const myLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    // defaultMeta: { service: 'server' },
    transports: [
        new winston.transports.File({ filename: 'logger/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logger/logs/combined.log' }),
        new winston.transports.Console(),
    ],
});

module.exports = myLogger;
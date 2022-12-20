var winston = require('winston');
  require('winston-daily-rotate-file');
//pst timezone
  const datetime =new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hourCycle: 'h23',
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
});
  const logformat = winston.format.combine(

    winston.format.timestamp({
      format:datetime
    }),
    winston.format.prettyPrint(),
    winston.format.json(), 
    winston.format.align(),  
    winston.format.printf(log =>`${log.timestamp} ${log.level}: ${log.message}  `)
  );


  var transport = new winston.transports.DailyRotateFile({
    level:process.env.LOG_LEVEL || 'info'|| 'error',
    format:logformat,
    filename: './log/log-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: '200k',
    maxFiles: '14d',
    json: true,
  });

  transport.on('rotate', function(oldFilename, newFilename) {
// call function like upload to s3 or on cloud
  });

  var logger = winston.createLogger({
    transports: [
      transport,
      new winston.transports.Console({
        level: 'info',
        json: true,
        stringify: (obj) => JSON.stringify(obj),}),
      
    ]
  });


  module.exports =(logger);
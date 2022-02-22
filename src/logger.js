import pino from 'pino';

const dest = pino.destination({
  dest: './log/log', // omit for stdout
  minLength: 4096, // Buffer before writing
  sync: false // Asynchronous logging
});

const logger = pino(dest);
setInterval(function () {
  logger.flush();
}, 10000).unref();

export default logger;
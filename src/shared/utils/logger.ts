// copied from github.com/achul123 for better logging
// with modifications to fit project structure and requirements
import pino from 'pino';

const prettyTransport = pino.transport({
  target: require.resolve('pino-pretty'),
  options: {
    colorize: true,
    translateTime: 'yyyy-mm-dd HH:mm:ss',
    ignore: 'pid,hostname',
    singleLine: false,
    hideObject: true,
    customColors: 'info:blue,warn:yellow,error:red'
  }
});

// Date for file log naming
const today = new Date();

class Logger {
  private _pinoLogger = pino(
    { level: 'debug' },
    pino.multistream([
      // For console logs
      { level: 'info', stream: prettyTransport },
      // For file logs
      {
        level: 'debug',
        stream: pino.destination({
          dest: `${process.cwd()}/logs/combined-${today.getFullYear()}.${
            today.getMonth() + 1
          }.${today.getDate()}.log`,
          sync: true,
          mkdir: true
        })
      }
    ])
  );

  /**
   * @param {string} content
   */
  success(content: string) {
    this._pinoLogger.info(content);
  }

  /**
   * @param {string} content
   */
  log(content: string) {
    this._pinoLogger.info(content);
  }

  /**
   * @param {string} content
   */
  warn(content: string) {
    this._pinoLogger.warn(content);
  }

  /**
   * @param {string} content
   * @param {object} ex
   */
  error(content: string, ex?: any) {
    if (ex) {
      this._pinoLogger.error(ex, `${content}: ${ex?.message}`);
    } else {
      this._pinoLogger.error(content);
    }
  }

  /**
   * @param {string} content
   */
  debug(content: string) {
    this._pinoLogger.debug(content);
  }
}

const logger = new Logger();

export default logger;

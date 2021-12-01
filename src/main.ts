import fs from 'fs';
import { Logger, LogLevel } from './logger';

const OUTPUT_DIRECTORY = 'out';

const consoleLogger = new Logger({ appName: 'test' });
consoleLogger.log('Hello World', LogLevel.INFO);
consoleLogger.log({ apikey: '1234567', message: 'the api key better be redacted!' });
consoleLogger.log({ noSensitiveInfo: 'everything should be here!' });

const fileLogger = new Logger({
  appName: 'test2', logToConsole: false, logger:
    ({ logLevel, message }) => {
      if (!fs.existsSync(OUTPUT_DIRECTORY)){
        fs.mkdirSync(OUTPUT_DIRECTORY);
      }
      fs.appendFileSync(`${OUTPUT_DIRECTORY}/log.txt`, `${logLevel}: ${typeof message === 'string' ? message : JSON.stringify(message)}\n`);
    }
});

fileLogger.log('Hello World File', LogLevel.INFO);
fileLogger.log({ apikey: '1234567', message: 'the api key better be redacted!' });
fileLogger.log({ noSensitiveInfo: 'everything should be here!' });

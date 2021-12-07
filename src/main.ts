import { Logger, LogLevel, LogOutputType } from './logger';

const consoleLogger = new Logger({ appName: 'test', logOutputType: LogOutputType.CONSOLE, logDirectory: './out' });
consoleLogger.log('Hello World', LogLevel.INFO);
consoleLogger.log({ apikey: '1234567', message: 'the api key better be redacted!' });
consoleLogger.log({ noSensitiveInfo: 'everything should be here!' });

const fileLogger = new Logger({ appName: 'test2', logOutputType: LogOutputType.FILE });

fileLogger.log('Hello World File', LogLevel.INFO);
fileLogger.log({ apikey: '1234567', message: 'the api key better be redacted!' });
fileLogger.log({ noSensitiveInfo: 'everything should be here!' });

const serviceLogger = new Logger({ appName: 'test3', logOutputType: LogOutputType.SERVICE });

serviceLogger.log('Hello World Service!', LogLevel.ERROR);
serviceLogger.log({ apikey: '34567', message: 'the api key better be redacted!' });
serviceLogger.log({ noSensitiveInfo: 'everything should be here!' });

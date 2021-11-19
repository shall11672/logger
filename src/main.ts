import { Logger, LogLevel } from './logger';

const consoleLogger = new Logger({ appName: 'test' });
consoleLogger.log('Hello World', LogLevel.INFO);
consoleLogger.log({ apikey: '1234567', message: 'the apikey better be redacted!' });
consoleLogger.log({ noSensitiveInfo: 'everything should be here!' });

// const logTo

// const fileLogger = new Logger({ appName: 'test2' });

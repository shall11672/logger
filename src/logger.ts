import { scrubMessage } from './scrubber';
import { LogLevel, LogOutputType, LogTypeToLogger } from './util';

const DEFAULT_OUTPUT_DIRECTORY = './out';

export interface LoggerConfig {
  appName: string;
  defaultLevel?: LogLevel;
  scrub?: () => any;
  logOutputType: LogOutputType;
  logDirectory?: string;
}

export class Logger {
  appName;

  defaultLevel;

  scrub;

  logOutputType;

  logDirectory;

  constructor(config: LoggerConfig) {
    this.appName = config.appName;
    this.defaultLevel = config.defaultLevel || LogLevel.INFO;
    this.scrub = config.scrub || scrubMessage;
    this.logOutputType = config.logOutputType || LogOutputType.CONSOLE;
    this.logDirectory = config.logDirectory || DEFAULT_OUTPUT_DIRECTORY;
  }

  log(message: string | object, level?: LogLevel) {
    const logger = LogTypeToLogger[this.logOutputType];
    logger({
      logLevel: level || this.defaultLevel,
      message: this.scrub(message),
      logDirectory: this.logDirectory,
    });
  }
}

export { LogOutputType, LogLevel };

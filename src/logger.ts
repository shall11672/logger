import fs from 'fs';
import chalk from 'chalk';
import http from 'http';
import { scrubMessage } from './util';

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}

export enum LogType {
  CONSOLE = 'CONSOLE',
  FILE = 'FILE',
  SERVICE = 'SERVICE'
}

interface LoggerConfig {
  appName: string;
  defaultLevel?: LogLevel;
  scrub?: () => any;
  logType: LogType;
}

interface LogMessage {
  logLevel: LogLevel,
  message: string | object
}

const OUTPUT_DIRECTORY = 'out';

const consoleLogger = ({ logLevel, message }: LogMessage) => {
  const COLOR_FUNCTION = {
    [LogLevel.INFO]: chalk.green,
    [LogLevel.WARN]: chalk.yellow,
    [LogLevel.ERROR]: chalk.red,
    [LogLevel.DEBUG]: chalk.blue
  }
  const logMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2)
  const colorMessage = COLOR_FUNCTION[logLevel];
  console.log(colorMessage(logMessage));
}

const fileLogger = ({ logLevel, message }: LogMessage) => {
  if (!fs.existsSync(OUTPUT_DIRECTORY)) {
    fs.mkdirSync(OUTPUT_DIRECTORY);
  }
  fs.appendFileSync(`${OUTPUT_DIRECTORY}/log.txt`, `${logLevel}: ${typeof message === 'string' ? message : JSON.stringify(message)}\n`);
}

const serviceLogger = ({ logLevel, message }: LogMessage) => {
  const data = JSON.stringify({ logLevel, message });

}

const LogTypeToLogger: { [E: string]: (param: LogMessage) => any }  = {
  [LogType.CONSOLE]: consoleLogger,
  [LogType.FILE]: fileLogger,
  [LogType.SERVICE]: serviceLogger
}

export class Logger {
  appName;
  defaultLevel;
  scrub;
  logType;

  constructor(config: LoggerConfig) {
    this.appName = config.appName;
    this.defaultLevel = config.defaultLevel || LogLevel.INFO;
    this.scrub = config.scrub || scrubMessage;
    this.logType = config.logType;
  }

  log(message: string | object, level?: LogLevel) {
    const logger = LogTypeToLogger[this.logType];
    logger({
      logLevel: level || this.defaultLevel,
      message: this.scrub(message)
    });
  }
}



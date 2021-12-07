import fs from 'fs';
import chalk from 'chalk';

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export enum LogOutputType {
  CONSOLE = 'CONSOLE',
  FILE = 'FILE'
}

export interface LogMessage {
  logLevel: LogLevel,
  message: string | object,
  logDirectory?: string
}

export const DEFAULT_LOG_EXTENSION = '.log.txt';

export const consoleLogger = ({ logLevel, message }: LogMessage): void => {
  const COLOR_FUNCTION = {
    [LogLevel.INFO]: chalk.green,
    [LogLevel.WARN]: chalk.yellow,
    [LogLevel.ERROR]: chalk.red,
    [LogLevel.DEBUG]: chalk.blue,
  };
  const logMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2);
  const colorMessage = COLOR_FUNCTION[logLevel];
  console.log(colorMessage(logMessage));
};

export const fileLogger = ({ logDirectory, logLevel, message }: LogMessage): void => {
  if (!logDirectory) return;
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  const fileName = getFileLoggerFileName();
  const logMessage = typeof message === 'string' ? message : JSON.stringify(message);
  fs.appendFileSync(`${logDirectory}/${fileName}${DEFAULT_LOG_EXTENSION}`, `${logLevel}: ${logMessage}\n`);
};

export const getFileLoggerFileName = () => {
  const today = new Date().toISOString();
  return today.substring(0, today.indexOf('T')); // 2021-12-07
}

export const LogTypeToLogger: { [E: string]: (param: LogMessage) => any } = {
  [LogOutputType.CONSOLE]: consoleLogger,
  [LogOutputType.FILE]: fileLogger
};

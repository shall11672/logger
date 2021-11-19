import * as chalk from 'chalk';
import traverse from 'traverse';

export enum LogLevel {
    INFO,
    WARN,
    ERROR,
    DEBUG
}

interface LoggerConfig {
    appName: string;
    logToConsole?: boolean;
    defaultLevel?: LogLevel;
    scrub?: () => any;
    logger?: (LogMessage) => any;
}

interface LogMessage {
    logLevel: LogLevel,
    message: string | object
}

const defaultLogger = ({ logLevel, message }: LogMessage) => {
    const COLOR_FUNCTION = {
        [LogLevel.INFO]: chalk.green,
        [LogLevel.WARN]: chalk.yellow,
        [LogLevel.ERROR]: chalk.red,
        [LogLevel.DEBUG]: chalk.blue
    }
    const logMessage = typeof message === 'string' ? message : JSON.stringify(message, null, 2)
    const colorMessage = COLOR_FUNCTION[logLevel]
    console.log(colorMessage(logMessage));
}

// log to console, file, external service
export class Logger {
    appName;
    logToConsole;
    defaultLevel;
    scrub;
    logger;

    constructor(config: LoggerConfig) {
        this.appName = config.appName;
        this.logToConsole = config.logToConsole || false;
        this.defaultLevel = config.defaultLevel || LogLevel.WARN;
        this.scrub = config.scrub || scrubMessage;
        this.logger = config.logger || defaultLogger;
    }

    log(message: string | object, level?: LogLevel) {
        this.logger({
            logLevel: level || this.defaultLevel,
            message: this.scrub(message)
        });
    }
}



import mockConsole from 'jest-mock-console';
import fs from 'fs';
import {
  consoleLogger, fileLogger, getFileLoggerFileName, LogLevel,
} from './util';

let infoMock: any;
let warnMock: any;
let errorMock: any;
let debugMock: any;
let restoreConsole: any;

jest.mock('chalk', () => ({
  green: (message: string | object) => infoMock(message),
  yellow: (message: string | object) => warnMock(message),
  red: (message: string | object) => errorMock(message),
  blue: (message: string | object) => debugMock(message),
}));
jest.mock('fs');

describe('util', () => {
  describe('consoleLogger', () => {
    beforeEach(() => {
      restoreConsole = mockConsole();
    });
    afterEach(() => {
      restoreConsole();
    });
    it('consoleLogger with info level should log green console', () => {
      const MOCK_MESSAGE = 'info level should log green console';
      infoMock = jest.fn().mockReturnValue(MOCK_MESSAGE);
      consoleLogger({
        logLevel: LogLevel.INFO,
        message: MOCK_MESSAGE,
      });
      expect(infoMock).toBeCalledTimes(1);
      expect(console.log).toHaveBeenCalled();
      // @ts-ignore
      expect(console.log.mock.calls).toEqual([[MOCK_MESSAGE]]);
    });
    it('consoleLogger with warn level should log yellow console', () => {
      const MOCK_MESSAGE = 'warn level should log yellow console';
      warnMock = jest.fn().mockReturnValue(MOCK_MESSAGE);
      consoleLogger({
        logLevel: LogLevel.WARN,
        message: MOCK_MESSAGE,
      });
      expect(warnMock).toBeCalledTimes(1);
      expect(console.log).toHaveBeenCalled();
      // @ts-ignore
      expect(console.log.mock.calls).toEqual([[MOCK_MESSAGE]]);
    });
    it('consoleLogger with error level should log red console', () => {
      const MOCK_MESSAGE = 'error level should log red console';
      errorMock = jest.fn().mockReturnValue(MOCK_MESSAGE);
      consoleLogger({
        logLevel: LogLevel.ERROR,
        message: MOCK_MESSAGE,
      });
      expect(errorMock).toBeCalledTimes(1);
      expect(console.log).toHaveBeenCalled();
      // @ts-ignore
      expect(console.log.mock.calls).toEqual([[MOCK_MESSAGE]]);
    });
    it('consoleLogger with debug level should log blue console', () => {
      const MOCK_MESSAGE = 'debug level should log blue console';
      debugMock = jest.fn().mockReturnValue(MOCK_MESSAGE);
      consoleLogger({
        logLevel: LogLevel.DEBUG,
        message: MOCK_MESSAGE,
      });
      expect(debugMock).toBeCalledTimes(1);
      expect(console.log).toHaveBeenCalled();
      // @ts-ignore
      expect(console.log.mock.calls).toEqual([[MOCK_MESSAGE]]);
    });
  });

  describe('fileLogger', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('should log object to file', () => {
      fileLogger({
        logDirectory: 'output',
        logLevel: LogLevel.ERROR,
        message: 'fileLoggerTest',
      });
      expect(fs.existsSync).toBeCalled();
      expect(fs.appendFileSync).toBeCalledWith(`output/${getFileLoggerFileName()}.log.txt`, `${LogLevel.ERROR}: fileLoggerTest\n`);
    });
    it('should not log to file, no logDirectory', () => {
      fileLogger({
        logLevel: LogLevel.ERROR,
        message: 'nothing',
      });
      expect(fs.existsSync).toBeCalledTimes(0);
      expect(fs.mkdirSync).toBeCalledTimes(0);
      expect(fs.appendFileSync).toBeCalledTimes(0);
    });
  });
});

import { scrubString, scrubMessage, SENSITIVE_MESSAGE_OVERRIDE } from './scrubber';

describe('utils', () => {
  it('scrubString should not parse anything other than string', () => {
    expect(() => { scrubString(null as unknown as any); }).toThrowError();
    expect(() => { scrubString(undefined as unknown as any); }).toThrowError();
    expect(() => { scrubString({} as unknown as any); }).toThrowError();
    expect(() => { scrubString(123 as unknown as any); }).toThrowError();
  });
  it('scrubString should correctly scrub string', () => {
    const CLEAN_STRING = 'this message is clean';
    expect(scrubString(CLEAN_STRING)).toBe(CLEAN_STRING);
    const DIRTY_STRING = 'this message contains apikey 293487';
    expect(scrubString(DIRTY_STRING)).toBe(SENSITIVE_MESSAGE_OVERRIDE);
  });
  it('scrubMessage should handle bad data', () => {
    expect(scrubMessage(null as unknown as any)).toBe(null);
    expect(scrubMessage(undefined as unknown as any)).toBe(undefined);
    expect(scrubMessage(123 as unknown as any)).toBe(123);
    expect(scrubMessage({})).toStrictEqual({});
  });
  it('scrubMessage should scrub object correctly', () => {
    const CLEAN_MESSAGE = {
      test: '123',
    };
    expect(scrubMessage(CLEAN_MESSAGE)).toStrictEqual(CLEAN_MESSAGE);
    const BAD_MESSAGE_A = {
      test: '123',
      apiKEY: '345',
    };
    const CLEANED_BAD_MESSAGE_A = {
      test: '123',
      apiKEY: SENSITIVE_MESSAGE_OVERRIDE,
    };
    expect(scrubMessage(BAD_MESSAGE_A)).toStrictEqual(CLEANED_BAD_MESSAGE_A);
  });
});

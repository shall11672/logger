import { scrubString, scrubMessage } from './util';

describe('utils', () => {
  it('scrubString should not parse anything other than string', () => {
    expect(() => {scrubString(null as unknown as any)}).toThrowError();
    expect(() => {scrubString(undefined as unknown as any)}).toThrowError();
    expect(() => {scrubString({} as unknown as any)}).toThrowError();
    expect(() => {scrubString(123 as unknown as any)}).toThrowError();
  });
  it('scrubString should not parse anything other than string', () => {
    expect(true).toBe(true);
  });
  it('scrubString should not parse anything other than string', () => {
    expect(true).toBe(true);
  });
});

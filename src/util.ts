import traverse from "traverse";

export const SENSITIVE_KEYWORDS = ['apikey', 'password', 'username', 'login'];
export const SENSITIVE_MESSAGE_OVERRIDE = '<REDACTED>';

export const scrubString = (message: string): string => {
  if (typeof message !== 'string') {
    // remove this once we know stuff works
    throw new Error('Invalid message');
  }
  const possibleRedaction = SENSITIVE_KEYWORDS.filter((keyword) => (message.indexOf(keyword) >= 0));
  return possibleRedaction.length > 0 ? SENSITIVE_MESSAGE_OVERRIDE : message;
}

export const scrubMessage = (logMessage: string | object): string | object => {
  if (typeof logMessage !== 'string' && typeof logMessage !== 'object') return logMessage;

  if (typeof logMessage === 'string') {
    return scrubString(logMessage);
  }

  traverse(logMessage).forEach(function (value: any) {
    if (this.isLeaf && typeof value === 'string') {
      this.update(scrubString(value as unknown as string));
    }
    if (SENSITIVE_KEYWORDS.includes(this.key as unknown as string)) {
      this.remove();
    }
  });
  return logMessage;
};

import traverse from "traverse";

const SENSITIVE_KEYWORDS = ['apikey', 'password', 'username', 'login'];
const SENSITIVE_MESSAGE_OVERRIDE = '<REDACTED>';

const scrubString = (message: string): string => {
  if (typeof message !== 'string') {
    // remove this once we know stuff works
    throw new Error('Invalid message');
  }
  SENSITIVE_KEYWORDS.filter((keyword) => (message.indexOf(keyword) >= 0));
  return SENSITIVE_KEYWORDS.length > 0 ? SENSITIVE_MESSAGE_OVERRIDE : message;
}

const scrubMessage = (logMessage: string | object): string | object => {
  if (!logMessage) return '';
  if (typeof logMessage === 'string') {
    return scrubString(logMessage);
  }
  if (typeof logMessage === 'object') {
    traverse(logMessage).forEach(function (value: any) {
      if (this.isLeaf && typeof value === 'string') {
        this.update(scrubString(logMessage as unknown as string));
      }
      if (SENSITIVE_KEYWORDS.includes(this.key)) {
        this.remove();
      }
    });
  }
};

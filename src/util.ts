export const SENSITIVE_KEYWORDS = ['apikey', 'password', 'username', 'login'];
export const SENSITIVE_MESSAGE_OVERRIDE = '<REDACTED>';

export const scrubString = (message: string): string => {
  if (typeof message !== 'string') {
    throw new Error('Invalid message');
  }
  const possibleRedaction = SENSITIVE_KEYWORDS.filter((keyword) => (
    message.indexOf(keyword) >= 0 || message.toLowerCase().indexOf(keyword) >= 0)
  );
  return possibleRedaction.length > 0 ? SENSITIVE_MESSAGE_OVERRIDE : message;
}

export const scrubMessage = (logMessage: string | object): string | object => {
  if ((typeof logMessage !== 'string' && typeof logMessage !== 'object') || logMessage === null) return logMessage;

  if (typeof logMessage === 'string') {
    return scrubString(logMessage);
  }

  const cleanMessage: { [E: string]: number | string } = {};
  for (const [key, value] of Object.entries(logMessage)) {
    if (SENSITIVE_KEYWORDS.includes(key.toLowerCase()) || typeof value === 'string' && SENSITIVE_KEYWORDS.includes(value.toLowerCase())) {
      cleanMessage[key] = SENSITIVE_MESSAGE_OVERRIDE;
    } else {
      cleanMessage[key] = value;
    }
  }

  return cleanMessage;
};

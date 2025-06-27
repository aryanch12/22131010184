export const logEvent = (message, data) => {
    const timestamp = new Date().toISOString();
    const log = `[LOG] ${timestamp} - ${message}`;
    console.log(log, data);
  };
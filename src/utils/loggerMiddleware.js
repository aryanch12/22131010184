export const loggerMiddleware = (msg, data) => {
    const timestamp = new Date().toISOString();
    console.log(`[LOG - ${timestamp}] ${msg}`, data);
  };
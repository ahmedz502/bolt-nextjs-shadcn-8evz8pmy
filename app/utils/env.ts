export const getEnvVariable = (key: string, defaultValue: string = ''): string => {
  return typeof process.env[key] !== 'undefined' ? process.env[key] as string : defaultValue;
}

export const SITE_URL = getEnvVariable('SITE_URL', 'http://localhost:3000');
export const NODE_ENV = getEnvVariable('NODE_ENV', 'development');


const publicRuntimeConfig = {
  NODE_ENV: process.env.NODE_ENV || 'production',

  APP_ROOT_PORT: process.env.APP_ROOT_PORT,
  APP_ROOT_URL: process.env.APP_ROOT_URL,
  API_ROOT_URL: process.env.API_ROOT_URL,
  LOCALSTORAGE_TOKEN_NAME: 'token',
};

export const {
  NODE_ENV,

  APP_ROOT_PORT,
  APP_ROOT_URL,
  API_ROOT_URL,

  LOCALSTORAGE_TOKEN_NAME,
} = publicRuntimeConfig;

export default publicRuntimeConfig.NODE_ENV === 'production';

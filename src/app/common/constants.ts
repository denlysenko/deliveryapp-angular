export const ACCESS_TOKEN = 'da_token';
export const AUTHORIZATION_HEADER = 'Authorization';
export const MESSAGE_SUBJECT = 'New Message';
export const HTTP_RETRY_COUNT = 3;
export const HTTP_RETRY_DELAY = 5000;
export const DEFAULT_LIMIT = 10;
export const USER_LOADED_KEY = 'user_loaded';

export const HTTP_STATUS = {
  NO_CONNECTION: 0,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  BAD_GATEWAY: 502
};

export const ORDER_STATUSES = [
  'New',
  'Calculated',
  'Delivering',
  'Delivered to warehouse',
  'Delivered to customer',
  'Canceled'
];

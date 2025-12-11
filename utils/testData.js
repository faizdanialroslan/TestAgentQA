/**
 * Test data and configuration constants
 */

const TEST_USERS = {
  VALID_USER: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
    email: 'tom@example.com'
  },
  ADMIN_USER: {
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com'
  },
  INVALID_USER: {
    username: 'invaliduser',
    password: 'wrongpassword',
    email: 'invalid@example.com'
  }
};

const TEST_URLS = {
  LOGIN_PAGE: 'https://the-internet.herokuapp.com/login',
  DROPDOWN_PAGE: 'https://the-internet.herokuapp.com/dropdown',
  CHECKBOXES_PAGE: 'https://the-internet.herokuapp.com/checkboxes',
  UPLOAD_PAGE: 'https://the-internet.herokuapp.com/upload',
  DOWNLOAD_PAGE: 'https://the-internet.herokuapp.com/download',
  PLAYWRIGHT_DOCS: 'https://playwright.dev/',
  JSON_API: 'https://jsonplaceholder.typicode.com',
  HTTPBIN: 'https://httpbin.org'
};

const SELECTORS = {
  LOGIN: {
    USERNAME_FIELD: '#username',
    PASSWORD_FIELD: '#password',
    LOGIN_BUTTON: 'button[type="submit"]',
    SUCCESS_MESSAGE: '.flash.success',
    ERROR_MESSAGE: '.flash.error',
    LOGOUT_BUTTON: 'a[href="/logout"]'
  },
  DROPDOWN: {
    DROPDOWN_SELECT: '#dropdown'
  },
  CHECKBOXES: {
    CHECKBOX_1: 'input[type="checkbox"]:first-of-type',
    CHECKBOX_2: 'input[type="checkbox"]:last-of-type'
  },
  COMMON: {
    MAIN_CONTENT: '[role="main"]',
    NAVIGATION: '[role="navigation"]',
    SEARCH_BOX: '[role="searchbox"]',
    SEARCH_BUTTON: 'button[aria-label*="search"], button[title*="search"]'
  }
};

const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  EXTRA_LONG: 60000
};

const ERROR_MESSAGES = {
  INVALID_USERNAME: 'Your username is invalid!',
  INVALID_PASSWORD: 'Your password is invalid!',
  SUCCESSFUL_LOGIN: 'You logged into a secure area!',
  SUCCESSFUL_LOGOUT: 'You logged out of the secure area!'
};

const API_ENDPOINTS = {
  POSTS: '/posts',
  USERS: '/users',
  COMMENTS: '/comments',
  ALBUMS: '/albums',
  PHOTOS: '/photos',
  TODOS: '/todos'
};

const BROWSER_CONTEXTS = {
  DESKTOP: {
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  },
  MOBILE: {
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  },
  TABLET: {
    viewport: { width: 768, height: 1024 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
  }
};

module.exports = {
  TEST_USERS,
  TEST_URLS,
  SELECTORS,
  TIMEOUTS,
  ERROR_MESSAGES,
  API_ENDPOINTS,
  BROWSER_CONTEXTS
};
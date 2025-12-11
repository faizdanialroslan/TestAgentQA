/**
 * Common utility functions for Playwright tests
 */

/**
 * Wait for an element to be visible and enabled before interacting with it
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {string} selector - The selector for the element
 * @param {number} timeout - Timeout in milliseconds (default: 10000)
 */
async function waitForElementReady(page, selector, timeout = 10000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
  await page.waitForSelector(selector, { state: 'attached', timeout });
}

/**
 * Take a screenshot with a descriptive name
 * @param {import('@playwright/test').Page} page - The Playwright page object
 * @param {string} name - Name for the screenshot
 */
async function takeScreenshot(page, name) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ 
    path: `screenshots/${name}-${timestamp}.png`,
    fullPage: true 
  });
}

/**
 * Wait for page to load completely
 * @param {import('@playwright/test').Page} page - The Playwright page object
 */
async function waitForPageLoad(page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Generate random string for test data
 * @param {number} length - Length of the random string
 * @returns {string} Random string
 */
function generateRandomString(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email address
 * @param {string} domain - Email domain (default: 'test.com')
 * @returns {string} Random email address
 */
function generateRandomEmail(domain = 'test.com') {
  const username = generateRandomString(8).toLowerCase();
  return `${username}@${domain}`;
}

/**
 * Format date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Sleep for specified milliseconds
 * @param {number} ms - Milliseconds to sleep
 */
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 */
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      retries++;
      if (retries === maxRetries) {
        throw error;
      }
      await sleep(delay * Math.pow(2, retries - 1));
    }
  }
}

module.exports = {
  waitForElementReady,
  takeScreenshot,
  waitForPageLoad,
  generateRandomString,
  generateRandomEmail,
  formatDate,
  sleep,
  retryWithBackoff
};
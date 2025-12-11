/**
 * Fast Test Helpers - Optimized utilities for faster test execution
 */

// Fast page goto with optimal settings
async function fastGoto(page, url, options = {}) {
  const defaultOptions = {
    waitUntil: 'domcontentloaded', // Faster than 'load'
    timeout: 15000,
    ...options
  };
  
  await page.goto(url, defaultOptions);
  
  // Wait for network to be mostly idle (faster than arbitrary timeouts)
  try {
    await page.waitForLoadState('networkidle', { timeout: 3000 });
  } catch {
    // Continue if network doesn't settle quickly
  }
}

// Fast form filling without delays
async function fastFill(page, selector, value, options = {}) {
  await page.locator(selector).fill(value, {
    timeout: 3000,
    ...options
  });
  // No arbitrary delays - let Playwright handle timing
}

// Fast click with auto-wait
async function fastClick(page, selector, options = {}) {
  await page.locator(selector).click({
    timeout: 3000,
    ...options
  });
  // No arbitrary delays
}

// Fast select option
async function fastSelect(page, selector, value, options = {}) {
  await page.locator(selector).selectOption(value, {
    timeout: 3000,
    ...options
  });
}

// Fast check/uncheck
async function fastCheck(page, selector, checked = true, options = {}) {
  const locator = page.locator(selector);
  if (checked) {
    await locator.check({ timeout: 3000, ...options });
  } else {
    await locator.uncheck({ timeout: 3000, ...options });
  }
}

// Wait for element with shorter timeout
async function fastWaitFor(page, selector, options = {}) {
  return await page.waitForSelector(selector, {
    timeout: 3000,
    ...options
  });
}

// Block unnecessary resources for faster page loads
async function blockUnnecessaryResources(page) {
  await page.route('**/*', (route) => {
    const resourceType = route.request().resourceType();
    
    // Block heavy resources that don't affect functionality
    if (['image', 'stylesheet', 'font', 'media'].includes(resourceType)) {
      route.abort();
    } else {
      route.continue();
    }
  });
}

module.exports = {
  fastGoto,
  fastFill,
  fastClick,
  fastSelect,
  fastCheck,
  fastWaitFor,
  blockUnnecessaryResources
};
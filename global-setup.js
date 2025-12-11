/**
 * Global setup for Playwright tests
 * This file runs once before all tests
 */
const { chromium } = require('@playwright/test');

async function globalSetup() {
  console.log('🚀 Starting global setup...');
  
  // Create a browser instance for setup
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Example: Perform any global setup tasks
    // Such as database preparation, authentication token generation, etc.
    
    console.log('✅ Global setup completed successfully');
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = globalSetup;
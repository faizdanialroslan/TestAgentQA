/**
 * Global teardown for Playwright tests
 * This file runs once after all tests
 */

async function globalTeardown() {
  console.log('🧹 Starting global teardown...');
  
  try {
    // Example: Perform any global cleanup tasks
    // Such as database cleanup, file cleanup, etc.
    
    console.log('✅ Global teardown completed successfully');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
  }
}

module.exports = globalTeardown;
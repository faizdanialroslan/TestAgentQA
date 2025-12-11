const { test, expect } = require('@playwright/test');

test.describe('Example Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a page before each test
    await page.goto('https://playwright.dev/');
  });

  test('should have correct page title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should navigate to getting started page', async ({ page }) => {
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });

  test('should check homepage elements', async ({ page }) => {
    // Check if the main heading exists
    const heading = page.getByRole('heading', { name: /Playwright/i });
    await expect(heading).toBeVisible();

    // Check if there are multiple links
    const links = page.getByRole('link');
    await expect(links).toHaveCountGreaterThan(5);
  });

  test('should interact with search functionality', async ({ page }) => {
    // Look for search functionality
    const searchButton = page.getByRole('button', { name: /search/i });
    if (await searchButton.isVisible()) {
      await searchButton.click();
      
      // Type in search box if it appears
      const searchInput = page.getByRole('searchbox');
      if (await searchInput.isVisible()) {
        await searchInput.fill('getting started');
        await page.keyboard.press('Enter');
        
        // Wait for search results
        await page.waitForSelector('[role="main"]', { timeout: 5000 });
      }
    }
  });
});
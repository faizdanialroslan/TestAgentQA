const { test, expect } = require('@playwright/test');

test.describe('Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a form testing page
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    // Fill in the login form
    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Verify successful login
    await expect(page.locator('.flash.success')).toContainText('You logged into a secure area!');
    await expect(page).toHaveURL(/.*secure/);
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill in incorrect credentials
    await page.fill('#username', 'invaliduser');
    await page.fill('#password', 'wrongpassword');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });

  test('should validate empty form submission', async ({ page }) => {
    // Click login without filling form
    await page.click('button[type="submit"]');
    
    // Verify error message for empty username
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
  });
});

test.describe('Navigation Tests', () => {
  test('should navigate through multiple pages', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    
    // Click on dropdown link
    await page.getByRole('link', { name: 'Dropdown' }).click();
    await expect(page).toHaveURL(/.*dropdown/);
    
    // Interact with dropdown
    await page.selectOption('#dropdown', 'Option 1');
    await expect(page.locator('#dropdown')).toHaveValue('1');
    
    // Go back and navigate to another page
    await page.goBack();
    await page.getByRole('link', { name: 'Checkboxes' }).click();
    await expect(page).toHaveURL(/.*checkboxes/);
  });
});
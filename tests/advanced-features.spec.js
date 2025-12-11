const { test, expect } = require('@playwright/test');
const { 
  waitForElementReady, 
  generateRandomString, 
  generateRandomEmail,
  retryWithBackoff 
} = require('../utils/helpers');

test.describe('Advanced Playwright Features', () => {
  test('should handle file uploads', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    
    // Create a simple text file for upload
    const fileContent = `Test file content: ${generateRandomString(10)}`;
    const fileName = `test-${Date.now()}.txt`;
    
    // Use the file chooser
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.click('#file-upload')
    ]);
    
    // For demo purposes, we'll just verify the file chooser appeared
    // In real tests, you would use: await fileChooser.setFiles(filePath);
    await page.fill('#file-upload', fileName);
    await page.click('#file-submit');
    
    // Verify upload feedback
    const heading = page.locator('h3');
    await expect(heading).toContainText('File Uploaded!');
  });

  test('should handle drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    
    const sourceElement = page.locator('#column-a');
    const targetElement = page.locator('#column-b');
    
    // Get initial text to verify the drag and drop worked
    const sourceText = await sourceElement.textContent();
    const targetText = await targetElement.textContent();
    
    // Perform drag and drop
    await sourceElement.dragTo(targetElement);
    
    // Verify the elements have switched
    await expect(sourceElement).toContainText(targetText);
    await expect(targetElement).toContainText(sourceText);
  });

  test('should handle multiple windows', async ({ context, page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');
    
    // Click link that opens new window
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a[href="/windows/new"]')
    ]);
    
    await newPage.waitForLoadState();
    
    // Verify new window content
    await expect(newPage.locator('h3')).toContainText('New Window');
    
    // Close new window
    await newPage.close();
    
    // Verify we're back to original window
    await expect(page.locator('h3')).toContainText('Opening a new window');
  });

  test('should handle JavaScript alerts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    // Handle alert dialog
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    
    await page.click('button[onclick="jsAlert()"]');
    
    // Verify result
    await expect(page.locator('#result')).toContainText('You successfully clicked an alert');
  });

  test('should handle JavaScript confirms', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    // Handle confirm dialog - accept
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('I am a JS Confirm');
      await dialog.accept();
    });
    
    await page.click('button[onclick="jsConfirm()"]');
    await expect(page.locator('#result')).toContainText('You clicked: Ok');
    
    // Handle confirm dialog - dismiss
    page.removeAllListeners('dialog');
    page.on('dialog', async dialog => {
      await dialog.dismiss();
    });
    
    await page.click('button[onclick="jsConfirm()"]');
    await expect(page.locator('#result')).toContainText('You clicked: Cancel');
  });

  test('should handle JavaScript prompts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    const promptText = generateRandomString(8);
    
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('I am a JS prompt');
      await dialog.accept(promptText);
    });
    
    await page.click('button[onclick="jsPrompt()"]');
    
    // Verify the entered text appears in result
    await expect(page.locator('#result')).toContainText(`You entered: ${promptText}`);
  });

  test('should handle dynamic loading', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/2');
    
    await page.click('#start button');
    
    // Wait for loading to complete
    await page.waitForSelector('#loading', { state: 'hidden' });
    
    // Verify the dynamically loaded content
    await expect(page.locator('#finish h4')).toContainText('Hello World!');
  });

  test('should handle hover interactions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    
    const firstFigure = page.locator('.figure').first();
    const firstCaption = firstFigure.locator('.figcaption');
    
    // Initially caption should not be visible
    await expect(firstCaption).not.toBeVisible();
    
    // Hover over the image
    await firstFigure.locator('img').hover();
    
    // Caption should now be visible
    await expect(firstCaption).toBeVisible();
    await expect(firstCaption.locator('h5')).toContainText('name: user1');
  });

  test('should handle iframe interactions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    
    // Switch to iframe
    const iframe = page.frameLocator('#mce_0_ifr');
    
    // Clear and type in the iframe
    await iframe.locator('body').clear();
    const testText = `Test text: ${generateRandomString(10)}`;
    await iframe.locator('body').fill(testText);
    
    // Verify the text was entered
    await expect(iframe.locator('body')).toContainText(testText);
  });

  test('should handle table interactions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables');
    
    const table = page.locator('#table1');
    
    // Get specific cell content
    const firstRowLastName = table.locator('tbody tr:first-child td:nth-child(1)');
    await expect(firstRowLastName).toContainText('Smith');
    
    // Click on a sortable header
    await table.locator('thead th:nth-child(1)').click();
    
    // Verify sorting (this is a simple example - in real tests you might verify order)
    const allLastNames = table.locator('tbody td:nth-child(1)');
    const count = await allLastNames.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should demonstrate retry logic with helper', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    
    // Use retry helper for unreliable operations
    const result = await retryWithBackoff(async () => {
      await page.reload();
      await waitForElementReady(page, 'h1', 5000);
      return await page.locator('h1').textContent();
    }, 3, 1000);
    
    expect(result).toContain('Welcome');
  });

  test('should generate random test data', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Use helper functions for test data
    const randomEmail = generateRandomEmail('testdomain.com');
    const randomPassword = generateRandomString(12);
    
    // These will fail login, but demonstrates data generation
    await page.fill('#username', randomEmail);
    await page.fill('#password', randomPassword);
    await page.click('button[type="submit"]');
    
    // Verify error message
    await expect(page.locator('.flash.error')).toContainText('Your username is invalid!');
    
    console.log(`Generated test data - Email: ${randomEmail}, Password: ${randomPassword}`);
  });
});
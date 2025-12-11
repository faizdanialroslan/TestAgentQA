const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.mainHeading = page.getByRole('heading', { level: 1 });
    this.navigationLinks = page.getByRole('link');
    this.searchButton = page.getByRole('button', { name: /search/i });
    this.searchBox = page.getByRole('searchbox');
  }

  /**
   * Navigate to the home page
   * @param {string} url - URL to navigate to
   */
  async navigate(url = 'https://the-internet.herokuapp.com/') {
    await this.page.goto(url);
  }

  /**
   * Get page title
   * @returns {string} Page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Verify page title contains expected text
   * @param {string} expectedText - Expected text in title
   */
  async verifyTitle(expectedText) {
    await expect(this.page).toHaveTitle(new RegExp(expectedText, 'i'));
  }

  /**
   * Click on a navigation link by text
   * @param {string} linkText - Text of the link to click
   */
  async clickNavigationLink(linkText) {
    await this.page.getByRole('link', { name: linkText }).click();
  }

  /**
   * Get all navigation links
   * @returns {Array} Array of link elements
   */
  async getNavigationLinks() {
    return await this.navigationLinks.all();
  }

  /**
   * Verify main heading is visible
   */
  async verifyMainHeading() {
    await expect(this.mainHeading).toBeVisible();
  }

  /**
   * Search for content (if search functionality exists)
   * @param {string} searchTerm - Term to search for
   */
  async search(searchTerm) {
    if (await this.searchButton.isVisible()) {
      await this.searchButton.click();
      
      if (await this.searchBox.isVisible()) {
        await this.searchBox.fill(searchTerm);
        await this.page.keyboard.press('Enter');
      }
    }
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Take a screenshot of the current page
   * @param {string} name - Name for the screenshot file
   */
  async takeScreenshot(name = 'homepage') {
    await this.page.screenshot({ 
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Get current URL
   * @returns {string} Current page URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Verify URL contains expected path
   * @param {string} expectedPath - Expected path in URL
   */
  async verifyUrl(expectedPath) {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  /**
   * Get page content
   * @returns {string} Page text content
   */
  async getPageContent() {
    return await this.page.textContent('body');
  }

  /**
   * Check if specific element is visible
   * @param {string} selector - CSS selector of the element
   * @returns {boolean} True if element is visible
   */
  async isElementVisible(selector) {
    return await this.page.locator(selector).isVisible();
  }

  /**
   * Scroll to bottom of page
   */
  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }

  /**
   * Scroll to top of page
   */
  async scrollToTop() {
    await this.page.evaluate(() => {
      window.scrollTo(0, 0);
    });
  }
}

module.exports = HomePage;
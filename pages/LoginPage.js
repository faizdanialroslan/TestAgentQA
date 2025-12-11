const { expect } = require('@playwright/test');
const { SELECTORS, ERROR_MESSAGES } = require('../utils/testData');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator(SELECTORS.LOGIN.USERNAME_FIELD);
    this.passwordField = page.locator(SELECTORS.LOGIN.PASSWORD_FIELD);
    this.loginButton = page.locator(SELECTORS.LOGIN.LOGIN_BUTTON);
    this.successMessage = page.locator(SELECTORS.LOGIN.SUCCESS_MESSAGE);
    this.errorMessage = page.locator(SELECTORS.LOGIN.ERROR_MESSAGE);
    this.logoutButton = page.locator(SELECTORS.LOGIN.LOGOUT_BUTTON);
  }

  /**
   * Navigate to the login page
   */
  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  /**
   * Fill username field
   * @param {string} username - Username to enter
   */
  async fillUsername(username) {
    await this.usernameField.fill(username);
  }

  /**
   * Fill password field
   * @param {string} password - Password to enter
   */
  async fillPassword(password) {
    await this.passwordField.fill(password);
  }

  /**
   * Click the login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Perform complete login action
   * @param {string} username - Username
   * @param {string} password - Password
   */
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Verify successful login
   */
  async verifyLoginSuccess() {
    await expect(this.successMessage).toContainText(ERROR_MESSAGES.SUCCESSFUL_LOGIN);
    await expect(this.page).toHaveURL(/.*secure/);
  }

  /**
   * Verify login error
   * @param {string} expectedError - Expected error message
   */
  async verifyLoginError(expectedError = ERROR_MESSAGES.INVALID_USERNAME) {
    await expect(this.errorMessage).toContainText(expectedError);
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Verify successful logout
   */
  async verifyLogoutSuccess() {
    await expect(this.errorMessage).toContainText(ERROR_MESSAGES.SUCCESSFUL_LOGOUT);
  }

  /**
   * Check if user is logged in
   * @returns {boolean} True if logged in
   */
  async isLoggedIn() {
    return await this.logoutButton.isVisible();
  }

  /**
   * Get current page URL
   * @returns {string} Current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = LoginPage;
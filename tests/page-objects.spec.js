const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const { TEST_USERS } = require('../utils/testData');

test.describe('Page Object Model Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('should login using page objects', async () => {
    await loginPage.navigate();
    await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    await loginPage.verifyLoginSuccess();
    
    // Verify user is logged in
    expect(await loginPage.isLoggedIn()).toBeTruthy();
  });

  test('should handle login failure using page objects', async () => {
    await loginPage.navigate();
    await loginPage.login(TEST_USERS.INVALID_USER.username, TEST_USERS.INVALID_USER.password);
    await loginPage.verifyLoginError();
    
    // Verify user is not logged in
    expect(await loginPage.isLoggedIn()).toBeFalsy();
  });

  test('should navigate to home page and verify content', async () => {
    await homePage.navigate('https://the-internet.herokuapp.com/');
    await homePage.verifyTitle('The Internet');
    
    // Get all navigation links and verify there are multiple
    const links = await homePage.getNavigationLinks();
    expect(links.length).toBeGreaterThan(5);
  });

  test('should navigate between pages using page objects', async () => {
    await homePage.navigate('https://the-internet.herokuapp.com/');
    
    // Navigate to login page
    await homePage.clickNavigationLink('Form Authentication');
    await homePage.verifyUrl('login');
    
    // Perform login
    await loginPage.login(TEST_USERS.VALID_USER.username, TEST_USERS.VALID_USER.password);
    await loginPage.verifyLoginSuccess();
    
    // Logout
    await loginPage.logout();
    await loginPage.verifyLogoutSuccess();
  });
});
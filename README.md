# Playwright Test Automation Project

This project contains automated tests using Playwright with JavaScript for end-to-end testing.

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npm run install
# or
npx playwright install
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests on specific browser
npm run test:chrome
npm run test:firefox
npm run test:safari
npm run test:mobile

# View test report
npm run report
```

## Project Structure

```
├── tests/                     # Test files
│   ├── example.spec.js        # Basic example tests
│   ├── form-interactions.spec.js  # Form testing examples
│   └── api-tests.spec.js      # API testing examples
├── pages/                     # Page Object Models
│   ├── HomePage.js            # Home page object
│   └── LoginPage.js           # Login page object
├── utils/                     # Utility functions and test data
│   ├── helpers.js             # Common helper functions
│   └── testData.js            # Test data and constants
├── playwright.config.js       # Playwright configuration
├── package.json              # Project dependencies
└── README.md                 # This file
```

## Writing Tests

### Basic Test Structure

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Test Suite Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('https://example.com');
  });

  test('test description', async ({ page }) => {
    // Your test steps here
    await expect(page).toHaveTitle(/Expected Title/);
  });
});
```

### Using Page Objects

```javascript
const LoginPage = require('../pages/LoginPage');

test('login test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('username', 'password');
  await loginPage.verifyLoginSuccess();
});
```

### API Testing

```javascript
test('API test', async ({ request }) => {
  const response = await request.get('/api/endpoint');
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data).toHaveProperty('id');
});
```

## Configuration

The `playwright.config.js` file contains:

- **Test directory**: `./tests`
- **Browsers**: Chromium, Firefox, WebKit, Mobile
- **Reporters**: HTML, JSON, JUnit
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On retry

### Customizing Configuration

You can modify `playwright.config.js` to:

- Change test directory
- Add/remove browsers
- Configure timeouts
- Set up test data
- Configure reporting
- Set up web servers

## Best Practices

### 1. Use Page Object Model
Organize your selectors and actions in page classes for better maintainability.

### 2. Use Test Data Constants
Store test data in separate files to avoid hardcoding values in tests.

### 3. Use Proper Assertions
Use Playwright's built-in assertions for better error messages and auto-waiting.

### 4. Handle Async Operations
Always use `await` with Playwright actions and assertions.

### 5. Use Descriptive Test Names
Write clear, descriptive test names that explain what is being tested.

### 6. Group Related Tests
Use `test.describe()` to group related tests together.

## Debugging

### 1. Debug Mode
```bash
npm run test:debug
```

### 2. Headed Mode
```bash
npm run test:headed
```

### 3. UI Mode
```bash
npm run test:ui
```

### 4. Screenshots and Videos
Failed tests automatically capture screenshots and videos in the `test-results/` directory.

### 5. Traces
Use trace viewer to inspect test execution:
```bash
npx playwright show-trace test-results/trace.zip
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Useful Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## Contributing

1. Follow the existing code structure
2. Write descriptive test names
3. Include appropriate assertions
4. Add comments for complex logic
5. Update documentation as needed

## License

This project is licensed under the ISC License.
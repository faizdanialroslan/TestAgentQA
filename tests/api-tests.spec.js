const { test, expect } = require('@playwright/test');

test.describe('API Testing with Playwright', () => {
  test('should make GET request and validate response', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    
    // Check status code
    expect(response.status()).toBe(200);
    
    // Parse and validate JSON response
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('userId', 1);
    expect(responseBody).toHaveProperty('title');
    expect(responseBody.title).toBeTruthy();
  });

  test('should make POST request and validate response', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Playwright',
      userId: 1
    };

    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: newPost
    });
    
    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.body).toBe(newPost.body);
    expect(responseBody.userId).toBe(newPost.userId);
  });

  test('should handle API error responses', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/999999');
    
    // This API returns 200 with empty object for non-existent resources
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    // The response should be empty or have minimal data
    expect(Object.keys(responseBody).length).toBeLessThanOrEqual(1);
  });
});

test.describe('API and UI Integration', () => {
  test('should verify UI reflects API data', async ({ page, request }) => {
    // First, get data from API
    const apiResponse = await request.get('https://jsonplaceholder.typicode.com/users/1');
    const userData = await apiResponse.json();
    
    // Then verify on a UI that displays this data (example with httpbin.org)
    await page.goto('https://httpbin.org/json');
    
    // This is a simple example - in real scenarios, you'd navigate to your app
    // that displays the API data and verify it matches
    const pageContent = await page.textContent('pre');
    expect(pageContent).toBeTruthy();
  });
});
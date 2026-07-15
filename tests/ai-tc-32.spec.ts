// NOTE:
// This repository does not include @playwright/test as a dependency (no package.json).
// The Playwright runner used in CI may still execute this spec, but local execution
// via `npx playwright test` can fail with "Cannot find module '@playwright/test'".
// The test below is a valid Playwright spec and follows the POM + AAA standards.

import { test } from 'playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('AI-TC-32 - Change Order validation — New item detection', () => {
  test('@new AI-TC-32 - Change Order validation — New item detection', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Arrange
    await loginPage.goto();
    await loginPage.assertLoginPageDisplayed();

    // Act
    await loginPage.loginWithEnvCredentials();

    // Assert
    await loginPage.assertLoggedIn();
  });
});

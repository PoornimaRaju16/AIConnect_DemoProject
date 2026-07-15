import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get welcomeHeading(): Locator {
    return this.page.getByRole('heading', { name: 'Welcome' });
  }

  private get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'you@company.com' });
  }

  private get passwordInput(): Locator {
    return this.page.getByRole('textbox').nth(1);
  }

  private get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign In' });
  }

  private get invalidCredentialsMessage(): Locator {
    return this.page.getByText('Invalid email or password');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async assertLoginPageDisplayed(): Promise<void> {
    await expect(this.welcomeHeading).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async loginWithEnvCredentials(): Promise<void> {
    const username: string | undefined = process.env.TEST_USERNAME ?? process.env.APP_USERNAME;
    const password: string | undefined = process.env.TEST_PASSWORD ?? process.env.APP_PASSWORD;

    if (!username || !password) {
      throw new Error('Missing credentials. Set TEST_USERNAME/TEST_PASSWORD (or APP_USERNAME/APP_PASSWORD).');
    }

    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await expect(this.signInButton).toBeEnabled();
    await this.signInButton.click();
  }

  async assertLoginFailed(): Promise<void> {
    await expect(this.invalidCredentialsMessage).toBeVisible();
    await expect(this.page).toHaveURL('http://63.181.141.143/login');
  }

  async assertLoggedIn(): Promise<void> {
    await expect(this.page).not.toHaveURL('http://63.181.141.143/login');
    await expect(this.signInButton).toHaveCount(0);
  }
}

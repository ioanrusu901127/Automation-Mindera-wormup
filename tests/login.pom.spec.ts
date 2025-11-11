import { test , expect, Page } from '@playwright/test';
import { LoginPage } from './Pages/login.page';
import { USERS } from './data/login/login';
import { beforeEach } from 'node:test';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto('/login');
});
  
test ('Login successful and logout', async ({ page }) => {
    await loginPage.loginSuccess(USERS.valid.username, USERS.valid.password);
});

test ('Login blocked validation', async ({ page }) => {
    await loginPage.loginBlocked(USERS.blocked.username, USERS.blocked.password);
});

test ('Invalid username scenario', async ({ page }) => {
    await loginPage.loginInvalid(USERS.invalid.username, USERS.invalid.password);
});

test ('Invalid password scenario', async ({ page }) => {
    await loginPage.loginWrongPassword(USERS.valid.username, USERS.wrongpassword.password);
});

test ('Multiple wrong password attempts', async ({ page }) => {
    await loginPage.loginTooManyAttempts(USERS.valid.username, USERS.wrongpassword.password);
});
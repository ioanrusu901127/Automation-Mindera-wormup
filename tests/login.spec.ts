import { test, expect, Page } from '@playwright/test';
import { USERS, MESSAGES } from './data/login/login';

test.beforeEach(async ({ page }) => {
    await page.goto('/login');
});

test('Login succesful and logout', async ({ page }) => {
    await test.step('Enter login credentials', async () => {
        await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.valid.username);
        await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.valid.password);
        await page.getByRole('button', { name: 'Login' }).click();
    });

    await test.step('Verify successful login', async () => {
        await expect(page.getByText(MESSAGES.success.login)).toBeVisible();
        await page.waitForTimeout(3000);
        await expect(page.url()).toBe('https://playground-drab-six.vercel.app/dashboard');
        await expect(page.getByText('User test authenticated')).toHaveText(MESSAGES.success.authenticated(USERS.valid.username));
    });

    await test.step('Perform and verify logout', async () => {
        await page.getByRole('button', { name: 'Logout' }).click();
        await expect(page.getByText('You have been logged out.')).toHaveText(MESSAGES.success.logout);
    });
});

test('Login blocked validation', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.blocked.username);
    await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.blocked.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User blocked!')).toHaveText(MESSAGES.errors.blocked);
});

test('Invalid username scenario', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill('USERS.invalid.username');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('USERS.invalid.password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User not found!')).toBeVisible();
});

test('Invalid password scenario', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Incorrect username or password!')).toBeVisible();
});

test('Multiple wrong password attempts version 1', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('wrongPassword1');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User temporarily blocked!')).toBeVisible();
});

test('Multiple wrong password attempts version 2', async ({ page }) => {
    await test.step('Attempt multiple failed logins', async () => {
        for (let i = 0; i < 3; i++) {
            await test.step(`Login attempt ${i + 1}`, async () => {
                await page.getByRole('textbox', { name: 'Type your username' }).fill(USERS.valid.username);
                await page.getByRole('textbox', { name: 'Type your password' }).fill(USERS.wrongpassword.password);
                await page.getByRole('button', { name: 'Login' }).click();
            });
        }
    });

    await test.step('Verify account is blocked', async () => {
        await expect(page.getByText('User temporarily blocked!')).toHaveText(MESSAGES.errors.tooManyAttempts);
    });
});


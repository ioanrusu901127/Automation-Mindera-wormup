import test, { expect } from '@playwright/test';

test('Login succesful validation', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User successfully logged in!')).toBeVisible();
});

test ('Login blocked validation', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Type your username' }).fill('testblock');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User is blocked!')).toBeVisible();
});

test('Invalid username scenario', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Type your username' }).fill('wrongUser');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User not found!')).toBeVisible();
});

test('Invalid password scenario', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('wrongPassword');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Incorrect username or password!')).toBeVisible();
});

test('Multiple wrong password attempts version 1', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
    await page.getByRole('textbox', { name: 'Type your password' }).fill('wrongPassword1');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('User temporarily blocked!')).toBeVisible();
});

test('Multiple wrong password attempts version 2', async ({ page }) => {
    await page.goto('/login');
    for (let i = 0; i < 3; i++) {
        await page.getByRole('textbox', { name: 'Type your username' }).fill('test');
        await page.getByRole('textbox', { name: 'Type your password' }).fill('wrongPassword');
        await page.getByRole('button', { name: 'Login' }).click();
    }
    await expect(page.getByText('User temporarily blocked!')).toBeVisible();
});



test('Login empty fields validation', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.url()).toBe('https://playground-drab-six.vercel.app/login');
}); 
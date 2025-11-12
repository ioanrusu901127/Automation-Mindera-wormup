import { test, expect } from '@playwright/test';

import { USERS } from './data/forms/users-date-forms';

for (const user of USERS) {
    
    test(`Form filling test - ${user.scenario} )`, async ({ page }) => {
        await page.goto('/form');
        await page.getByRole('textbox', { name: 'Name *' }).click();
        await page.getByRole('textbox', { name: 'Name *' }).fill(user.name);
        await page.getByRole('textbox', { name: 'Email *' }).click();
        await page.getByRole('textbox', { name: 'Email *' }).fill(user.email);
        await page.getByRole('textbox', { name: 'Password *' }).click();
        await page.getByRole('textbox', { name: 'Password *' }).fill(user.password);
        await page.getByLabel('Country *').selectOption({ label: user.countrylabel });
        await page.getByRole('radio', { name: user.gender, exact: true }).check();
        for (const hobby of user.hobbies) {
            await page.getByRole('checkbox', { name: hobby }).check();
            }
        await page.getByRole('button', { name: 'Send' }).click();
        await expect (page.getByText('The form has been submitted')).toBeVisible();
        await expect (page.getByText('Success!')).toBeVisible();
    }) 
    };

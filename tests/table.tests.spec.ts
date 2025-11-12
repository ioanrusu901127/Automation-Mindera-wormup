import { test, expect } from '@playwright/test';
import hpCharacters from './data/json/hpCharacters.json';


for ( const c of hpCharacters) {
    test('Character ' + c.name + ' is present in the table', async ({ page }) => {
        await page.goto('/table');
        const nameWithoutSpaces = c.name.replace(' ', '');
        await expect(page.locator('#tableCharacterName' + nameWithoutSpaces)).toBeVisible();
        await expect(page.getByRole('img', { name: c.name })).toBeVisible();
        await expect(page.locator('#tableCharacterHouse' + nameWithoutSpaces)).toBeVisible();

        //this constant handles cases where dateOfBirth is missing in the JSON data
        const birth = c.dateOfBirth ? c.dateOfBirth : 'Unknown';
        await expect(page.getByRole('cell', { name: birth })).toBeVisible();
        
    }
    );
}




import { test , expect } from '@playwright/test';
import hpCharacters from './data/json/hpCharacters.json';
import { TablePage } from './Pages/table.page';


for ( const c of hpCharacters) {
    test('Character ' + c.name, async ({ page }) => {
        const tablePage = new TablePage(page);
        await tablePage.navigateToTable();  
        await tablePage.verifyNameText(c.name);
        await tablePage.verifyHouseVisible(c.name);
        await tablePage.verifyIcon(c.name);
        await tablePage.verifyBirthDate(c.dateOfBirth);
        await tablePage.verifyActorName(c.actor);



    

    }
    );
}
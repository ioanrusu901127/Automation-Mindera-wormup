import type { Page , Locator} from '@playwright/test';
import test, { expect } from '@playwright/test';

export class TablePage {
    private page: Page;
    private characterName: (name: string) => Locator;
    private characterImage: (name: string) => Locator;
    private characterHouse: (name: string) => Locator;
    private characterBirth: (birthText: string) => Locator;
    private characterActor: (name: string) => Locator;

    constructor(page: Page) {

        this.page = page;        
        const format = (s: string) => s ? s.replace(/\s+/g, '') : '';

        this.characterName = (name: string) => this.page.locator('#tableCharacterName' + format(name));
        this.characterImage = (name: string) => this.page.getByRole('img', { name });
        this.characterHouse = (name: string) => this.page.locator('#tableCharacterHouse' + format(name));
        this.characterBirth = (birthText: string) => this.page.getByRole('cell', { name: birthText || 'Unknown' });
        this.characterActor = (name: string) => this.page.getByRole('cell', { name: name });
    }

    async navigateToTable() {
        await test.step('Navigate to the HP table', async () => {
        this.page.goto('/table');
    });
    }


    async verifyNameText(name: string) {
        await test.step('Check the name of character: ' + name, async ()=> {
        await expect(this.characterName(name)).toBeVisible();

    })
    }

    async veryfyHouseVisible(name: string) {
        await test.step('Verify the house of the character: ' + name, async ()=> {
        await expect(this.characterHouse(name)).toBeVisible();

    })
    }
   

    async verifyIcon(name: string) {
        await test.step('Verify the character\'s icon: ' + name, async () => {
        await expect(this.characterImage(name)).toBeVisible();

    });
    }

    async verifyBirthDate(birthday: string | null) {
        birthday = birthday ? birthday : 'Unknown';
        await test.step('Verify the character\'s birth date: ' + birthday, async () => {
        await expect(this.characterBirth(birthday)).toBeVisible();

    });
    }

    async verifyActorName(name: string) {
        await test.step('Verify the character\'s actor name: ' + name, async () => {
        await expect(this.characterActor(name)).toBeVisible();

    });
    }



}
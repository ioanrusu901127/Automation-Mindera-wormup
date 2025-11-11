import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { count } from 'console';

export class FormPage {
    
    private nameimput: Locator
    private passwordinput: Locator
    private emailinput: Locator
    private countryselect: Locator
    private genderRadio: (value: string) => Locator
    private genderGroup: Locator
    private sendButton: Locator
    private successTitle: Locator
    private successBody: Locator
    

    constructor(private page: Page) {
        this.page = page;
        this.nameimput = page.getByRole('textbox', { name: 'Name *' });
        this.passwordinput = page.getByRole('textbox', { name: 'Password *' });
        this.emailinput = page.getByRole('textbox', { name: 'Email *' });
        this.countryselect = page.getByLabel('Country *');
        this.genderRadio = (value) =>
      page.getByRole('radio', { name: value, exact: true });
        this.genderGroup = page.locator('#genderGroup');
        this.sendButton = page.getByRole('button', { name: 'Send' });
        this.successTitle = page.getByText('Success!');
        this.successBody = page.getByText('The form has been submitted');


    
    }

async navigatetoForm() {
    await this.page.goto('/form');
  }


async fillName(userName: string) {
    await this .nameimput.fill(userName);
}

async fillEmail(userEmail: string) {
    await this.emailinput.fill(userEmail);      
}

async fillPassword(userPassword: string) {
    await this.passwordinput.fill(userPassword);        

}

async selectCountry(countryLabel: string) {
    await this.countryselect.selectOption({ label: countryLabel });         
}

async selectGender(genderValue: string) {
    await this.genderRadio(genderValue).check();            
}

async selectHobbies(hobbies: string[]) {
    for (const hobby of hobbies) {
        await this.page.getByRole('checkbox', { name: hobby }).check();
    }      
}

async clickSend() {
    await this.sendButton.click();      
}


async verifyFormSubmission() {
    await expect (this.successBody).toBeVisible();
    await expect (this.successTitle).toBeVisible();      
}
}
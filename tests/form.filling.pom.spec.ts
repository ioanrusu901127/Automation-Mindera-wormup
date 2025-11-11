import test from '@playwright/test';
import { FormPage } from './Pages/form.page';
import { USERS } from './data/forms/users-date-forms';

for(const user of USERS) {

test('Form fill-' + user.name + ',' + user.countrylabel, async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.navigatetoForm();
    await formPage.fillName(user.name); 
    await formPage.fillEmail(user.email);
    await formPage.fillPassword(user.password);
    await formPage.selectCountry(user.countrylabel);
    await formPage.selectGender(user.gender);
    await formPage.selectHobbies(user.hobbies);
    await formPage.clickSend();
    await formPage.verifyFormSubmission();

    
}); 
}


import { Page, Locator, expect, test } from '@playwright/test';


export class PokemonAPIPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
   

    constructor(page: Page) {
        this.page = page;;
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Type your username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Type your password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
}
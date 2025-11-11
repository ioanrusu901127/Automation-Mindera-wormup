import { test , expect , Locator , Page} from '@playwright/test';
import { USERS , MESSAGES } from '../data/login/login';

export class LoginPage {
    private page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    private logoutButton: Locator;
    private messageSuccessLogin: Locator;
    private messageBlockedUser: Locator;
    private messageUserNotFound: Locator;
    private messageWrongPassword: Locator;
    private messageTooManyAttempts: Locator;
    private messageLogout: Locator;
    
    constructor(page: Page) {
        this.page = page;;
        this.usernameInput = page.getByRole('textbox', { name: 'Type your username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Type your password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
        this.messageSuccessLogin = page.getByText(MESSAGES.success.login);
        this.messageBlockedUser = page.getByText(MESSAGES.errors.blocked);
        this.messageUserNotFound = page.getByText(MESSAGES.errors.invalid);
        this.messageWrongPassword = page.getByText(MESSAGES.errors.wrongpassword);
        this.messageTooManyAttempts = page.getByText(MESSAGES.errors.tooManyAttempts);
        this.messageLogout = page.getByText(MESSAGES.success.logout);


    }

    //Methods: 

    async navigateToLogin() {
        await test.step('Navigate to Login Page', async () => {
        await this.page.goto('/login');
        });
    }

    async loginSuccess(username: string, password: string) {
        await test.step('Enter login credentials', async () => {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    });
        await test.step('Click the Login button', async () => {
        await this.loginButton.click();
        });
        await test.step('Verify successful login message', async () => {
        await expect(this.messageSuccessLogin).toBeVisible();
        });
        await test.step('Perform logout', async () => {
        await this.logoutButton.click();
        });
        await test.step('Verify logout message', async () => {
        await expect(this.messageLogout).toBeVisible();
        })
        };
      

    async loginBlocked(username: string, password: string) {
        await test.step('Enter blocked user credentials', async () => {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        });
        await test.step('Click the Login button', async () => {
        await this.loginButton.click();
        });
        await test.step('Verify blocked user message', async () => {
        await expect(this.messageBlockedUser).toBeVisible();
        });
    }

    async loginInvalid(username: string, password: string) {
        await test.step('Enter invalid username credentials', async () => {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        });
        await test.step('Click the Login button', async () => {
        await this.loginButton.click();
        });
        await test.step('Verify user not found message', async () => {
        await expect(this.messageUserNotFound).toBeVisible();
        });
    }

    async loginWrongPassword(username: string, password: string) {
        await test.step('Enter credentials with wrong password', async () => {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        });
        await test.step('Click the Login button', async () => {
        await this.loginButton.click();
        });
        await test.step('Verify wrong password message', async () => {
        await expect(this.messageWrongPassword).toBeVisible();
        });
    }

    async loginTooManyAttempts(username: string, password: string) {
        await test.step('Enter wrong credentials 3 times', async () => {
        for (let i = 0; i < 3; i++) {
            await test.step(`Login attempt ${i + 1}`, async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
        }
        });
        await test.step('Verify too many attempts message', async () => {
        await expect(this.messageTooManyAttempts).toBeVisible();
    });
    }

}

export const USERS = {
    valid: {
        username: 'test',
        password: 'password123'
    },
    blocked: {
        username: 'testblock',
        password: 'password123'
    },
    invalid: {
        username: 'invalidUser',
        password: 'password123'
    },
    wrongpassword: {
        username: 'test',
        password: 'wrongPassword'
    }
};
export const MESSAGES = {
    success: {
        login: 'User successfully logged in!',
        authenticated: (user:string) => `User ${user} authenticated`,
        logout: 'You have been logged out. Please log in.'
    },
    errors: {
        blocked: 'User blocked!',
        invalid : 'User not found!',
        wrongpassword : 'Incorrect username or password!',
        tooManyAttempts : 'User temporarily blocked!',
    },
};

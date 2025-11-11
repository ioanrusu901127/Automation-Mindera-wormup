export type User = { 
        name: string;
        email: string;
        password: string;
        countrylabel: string;
        countryvalue: string;
        gender: string;
        gendervalue: string;
        hobbies: string[];
    
};
// valid users:
export const USERS = [
    {
        scenario: 'Full form brazilian male user',
        name: 'John Doe',
        email: 'johndoe@yopmail.com',
        password: 'Password123!',
        countrylabel: 'Brazil',
        countryvalue: 'brazil',
        gender: 'Male',
        gendervalue: 'male',
        hobbies: ['Travel'],

    },
    {
        scenario: 'Full form female user from USA',
        name: 'Jane Smith',
        email: 'janesmith99@gmail.com',
        password: 'Jane99$',
        countrylabel: 'United States of America',
        countryvalue: 'usa',
        gender: 'Female',
        gendervalue: 'female',
        hobbies: ['Movies', 'Sports'],
    },
      {
        scenario: 'Full form canadian other gender user',
        name: 'Xavier Lee',
        email: 'jxavier123@gmail.com',
        password: 'a',
        countrylabel: 'Canada',
        countryvalue: 'canada',
        gender: 'Other',
        gendervalue: 'other',
        hobbies: ['Read books', 'Video Games', 'Board Games'],
    },
    {
        scenario: 'No hobbies mexican user',
        name: 'Juan Maeques',
        email: 'juanitom@gmail.com',
        password: 'passowrd123',
        countrylabel: 'Mexico',
        countryvalue: 'mexico',
        gender: 'Male',
        gendervalue: 'male',
        hobbies: [],
    },
    {
        scenario: 'All hobbies portughese female user',
        name: 'Maria Silva',
        email: 'marias@gmail.com',
        password: 'pass1',
        countrylabel: 'Portugal',
        countryvalue: 'portugal',
        gender: 'Female',
        gendervalue: 'female',
        hobbies: ['Travel', 'Read books', 'Movies', 'Sports', 'Video Games', 'Board Games'],
    }
 ]
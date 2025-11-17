import { test, expect } from '@playwright/test';
import { request } from 'http';

test('Check if it has title ', async ({ request }) => {
    const response = await request.get('https://pokeapi.co/api/v2/pokemon/');
    console.log(response.status());
    expect(response.status()).toBe(200);

    console.log(await response.json());
    const body = await response.json();

    expect(body.count).toBe(1328);
    expect(body.results[0].name).toBe('bulbasaur');
    
    const pokemonResponse = await request.get(body.results[0].url);

    console.log(await pokemonResponse.json());
    expect(pokemonResponse.status()).toBe(200);
    
    const pokemonBody = await pokemonResponse.json();
    expect(pokemonBody.types[0].type.name).toBe('grass');
    expect(pokemonBody.types[1].type.name).toBe('poison');

});
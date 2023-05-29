import { luhn, validateEmail, validateToken } from '../libs/utils';

describe('Validando tarjetas', () => {
    test("validando cuando  es una tarjeta válida", () => {
        const valueExpect = true;
        const valueofFunction = luhn("4111111111111111");
        expect(valueExpect).toEqual(valueofFunction);
    });


    test("validando cuando NO es una tarjeta válida", () => {
        const valueExpect = false;
        const valueofFunction = luhn("4111111111111112");
        expect(valueExpect).toEqual(valueofFunction);
    });
})



describe('Validando Email', () => {
    test("validando cuando un email es válido", () => {
        const valueExpect = true;
        const valueofFunction = validateEmail("prueba@hotmail.com");
        expect(valueExpect).toEqual(valueofFunction);
    });


    test("validando cuando un email NO es válido", () => {
        const valueExpect = false;
        const valueofFunction = luhn("prueba@otro.com");
        expect(valueExpect).toEqual(valueofFunction);
    });
})




describe('Validando el formato del token', () => {
    test("validando cuando el formato del token es válido", () => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYXJkX251bWJlciI6IjQwMTc5MzM5MTQzNTQ1ODkiLCJleHBpcmF0aW9uX3llYXIiOiIyMDI0IiwiZXhwaXJhdGlvbl9tb250aCI6IjEwIiwiZW1haWwiOiJkY2h1cXVpQGhvdG1haWwuY29tIiwiaWF0IjoxNjg1MzE5NjA4LCJleHAiOjE2ODUzMTk2Njh9.RjWo0j7lJYkd_W0rMioir-ZRlw_KmFN3NXslnCyKpTE";
        const valueExpect = { ok: true, rsta: token };
        const valueofFunction = validateToken("Bearer " + token, false);
        expect(valueExpect).toEqual(valueofFunction);
    });


    test("validando cuando el formato del token NO es válido", () => {
        let token = "1234445555555555";
        const valueExpect = { ok: false, rsta: "El formato del token no es válido" };
        const valueofFunction = validateToken(token, true);
        expect(valueExpect).toEqual(valueofFunction);
    });
})
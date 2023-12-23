import expect from "expect";
import { test } from "@jest/globals";
import jest from "jest"; // Import the 'jest' package
import AuthService from "./auth_service"; // Import the 'AuthService' module


// Testen der Registrierungsfunktion
test("Registrierung testen", () => {
    // Mocken der API-Antwort
    const mockResponse = { data: { message: "User registered successfully!" } };
    AuthService.register = jest.fn().mockResolvedValue(mockResponse);
    // Aufruf der Registrierungsfunktion
    return AuthService.register("testuser", "test@test.ch", "testpassword").then((response) => {
        // Überprüfen Sie, ob die Funktion die richtige Antwort zurückgibt
        expect(response).toEqual(mockResponse.data);
    });
})

// Testen der Anmeldefunktion
test("Anmeldung testen", () => {
    // Mocken der API-Antwort
    const mockResponse = { data: { message: "Anmeldung erfolgreich!" } };
    AuthService.login = jest.fn().mockResolvedValue(mockResponse);
    // Aufruf der Anmeldefunktion
    return AuthService.login("testuser", "testpassword").then((response) => {
        // Überprüfen Sie, ob die Funktion die richtige Antwort zurückgibt
        expect(response).toEqual(mockResponse.data);
    });
})
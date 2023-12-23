/**
 * Stellt Funktionen für die Authentifizierung bereit.
 * @module AuthService
 */

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

/**
 * Registriert einen neuen Benutzer.
 * @param {string} username - Der Benutzername.
 * @param {string} email - Die E-Mail-Adresse des Benutzers.
 * @param {string} password - Das Passwort des Benutzers.
 * @returns {Promise} Ein Promise-Objekt, das die Serverantwort enthält.
 */
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const registerRole = (username, email, password, role) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
    role: [role], // Verpacke die Rolle in ein Array
  });
};

/**
 * Meldet einen Benutzer an.
 * @param {string} username - Der Benutzername.
 * @param {string} password - Das Passwort des Benutzers.
 * @returns {Promise} Ein Promise-Objekt, das die Serverantwort enthält.
 */
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

/**
 * Meldet den aktuellen Benutzer ab.
 * @returns {Promise} Ein Promise-Objekt, das die Serverantwort enthält.
 */
const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

/**
 * Gibt den aktuellen Benutzer zurück.
 * @returns {Object|null} Das aktuelle Benutzerobjekt oder null, wenn kein Benutzer angemeldet ist.
 */
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  registerRole,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
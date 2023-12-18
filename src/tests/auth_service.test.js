import axios from 'axios';
import { register } from '../functions/auth_service';
import { expect } from 'jest';
import { jest } from '@jest/globals';
import { describe } from 'jest';
import { it } from 'jest';

jest.mock('axios');

describe('register', () => {
  const API_URL = "http://localhost:8080/api/auth/";

  it('should make a POST request to the API with the provided username, email, and password', () => {
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'testpassword';

    register(username, email, password);

    expect(axios.post).toHaveBeenCalledWith(API_URL + 'signup', {
      username,
      email,
      password,
    });
  });
});
import axios from 'axios';
import { login } from './auth_service';
import { describe } from 'jest';
import { jest } from '@jest/globals';
import { it } from 'jest';
import { expect } from 'jest';

jest.mock('axios');

describe('login', () => {
  it('should call axios.post with the correct parameters', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const response = { data: { username: 'testuser' } };
    axios.post.mockResolvedValue(response);

    return login(username, password).then(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'API_URL/signin',
        { username, password }
      );
    });
  });

  it('should set user data in localStorage if response contains username', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const response = { data: { username: 'testuser' } };
    axios.post.mockResolvedValue(response);

    return login(username, password).then(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(response.data)
      );
    });
  });

  it('should return the response data', () => {
    const username = 'testuser';
    const password = 'testpassword';
    const response = { data: { username: 'testuser' } };
    axios.post.mockResolvedValue(response);

    return login(username, password).then((data) => {
      expect(data).toEqual(response.data);
    });
  });
});
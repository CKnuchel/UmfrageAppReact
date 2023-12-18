import axios from 'axios';
import { getQuestions } from '../functions/get_questions';
import jest from 'jest';
import { describe } from 'jest';
import { beforeEach } from 'jest';
import { afterEach } from 'jest';
import { it } from 'jest';
import { expect } from 'jest';

jest.mock('axios');

describe('getQuestions', () => {
  const API_URL = 'http://localhost:8080';
  const token = 'dummyToken';
  const questions = [{ id: 1, question: 'Question 1' }, { id: 2, question: 'Question 2' }];

  beforeEach(() => {
    axios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: questions }),
    });
    localStorage.setItem('user', JSON.stringify({ accessToken: token }));
  });

  afterEach(() => {
    localStorage.removeItem('user');
  });

  it('should make a GET request to the API with the correct headers', async () => {
    await getQuestions();

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: API_URL,
    });

    expect(axios.create().get).toHaveBeenCalledWith('/questions', {
      headers: {
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      },
    });
  });

  it('should return the questions received from the API', async () => {
    const result = await getQuestions();

    expect(result).toEqual(questions);
  });
});
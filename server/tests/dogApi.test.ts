import { describe, it, expect } from 'vitest';

describe('Dog API configuration', () => {
  it('it should use default Dog API URL when environment variable is not set', () => {
    const defaultUrl = 'https://dog.ceo/api/breeds/image/random';
    const envUrl = process.env.DOG_API_URL || defaultUrl;

    expect(envUrl).toBe(defaultUrl);
  });
});
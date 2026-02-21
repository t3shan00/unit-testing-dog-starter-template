import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService.getRandomDogImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // Positive Test
  it('should return imageUrl equal to mocked message, status success, and call fetch once', async () => {
    const mockedApiResponse = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(mockedApiResponse)
    });

    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockedApiResponse.message);
    expect(result.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  // Negative Test
  it('should throw error when API returns 500', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    });

    vi.stubGlobal('fetch', fetchMock as unknown as typeof fetch);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});
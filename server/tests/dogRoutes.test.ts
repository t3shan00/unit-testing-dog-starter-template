import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn()
}));

import dogRoutes from '../routes/dogRoutes';
import { getDogImage } from '../controllers/dogController';

describe('dogRoutes - GET /api/dogs/random', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Positive test for 200 server response
  it('should return 200, success value is true, and returned mocked imageUrl', async () => {
    const mockedResponse = {
      success: true,
      data: {
        imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
        status: 'success'
      }
    };

    (getDogImage as unknown as ReturnType<typeof vi.fn>)
      .mockImplementation((_req, res) => res.status(200).json(mockedResponse));

    const app = express();
    app.use('/api/dogs', dogRoutes);

    const res = await request(app).get('/api/dogs/random');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.imageUrl)
      .toContain('https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg');
  });

  // Negative Test for 500 error
  it('should return 500 and error JSON when controller returns failure', async () => {
    const mockedErrorResponse = {
      success: false,
      error: 'Failed to fetch dog image: Network error'
    };

    (getDogImage as unknown as ReturnType<typeof vi.fn>)
      .mockImplementation((_req, res) => res.status(500).json(mockedErrorResponse));

    const app = express();
    app.use('/api/dog', dogRoutes);

    const res = await request(app).get('/api/dog/random');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('Failed to fetch dog image: Network error');
  });
});
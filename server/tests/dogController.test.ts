import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Request, Response } from 'express';

vi.mock('../services/dogService', () => ({
  getRandomDogImage: vi.fn()
}));

import { getDogImage } from '../controllers/dogController';
import { getRandomDogImage } from '../services/dogService';

describe('dogController.getDogImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return success true and mocked service data with new imageUrl', async () => {
    const mockedServiceResponse = {
      imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
      status: 'success'
    };

    (getRandomDogImage as unknown as ReturnType<typeof vi.fn>)
      .mockResolvedValue(mockedServiceResponse);

    const req = {} as Request;

    const res = {
      json: vi.fn(),
      status: vi.fn().mockReturnThis()
    } as unknown as Response;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedServiceResponse
    });

    expect(getRandomDogImage).toHaveBeenCalledOnce();
  });
});
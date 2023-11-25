import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/hello';

describe('Next.js API Handler', () => {
  it('should handle the request and redirect to /', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        code: 'your-test-code', // Replace with a test code if needed
      },
    });

    await handler(req, res);

    expect(res._getRedirectUrl()).toBe('/');
    expect(res.statusCode).toBe(302); // 302 is the status code for redirection
  });

  it('should handle the request without code and not redirect', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getRedirectUrl()).toBe(undefined);
    expect(res.statusCode).toBe(200); // Assuming you don't redirect if code is not present
  });

  // Add more test cases as needed
});

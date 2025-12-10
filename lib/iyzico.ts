// eslint-disable-next-line
const Iyzipay = require('iyzipay');

// Initialize iyzico client (lazy initialization)
let iyzipayInstance: any = null;

function getIyzipay() {
  if (!iyzipayInstance) {
    iyzipayInstance = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || '',
      secretKey: process.env.IYZICO_SECRET_KEY || '',
      uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    });
  }
  return iyzipayInstance;
}

// Test API connection
export function testConnection(): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
      resolve({
        success: false,
        error: 'iyzico credentials not configured',
      });
      return;
    }

    const iyzipay = getIyzipay();
    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: Date.now().toString(),
    };

    iyzipay.apiTest.retrieve(request, (err: any, result: any) => {
      if (err) {
        resolve({ success: false, error: err.message || 'Connection failed' });
      } else if (result.status === 'success') {
        resolve({ success: true });
      } else {
        resolve({ success: false, error: result.errorMessage || 'Unknown error' });
      }
    });
  });
}

// Test credit cards for sandbox
export const testCards = {
  success: {
    cardNumber: '5528790000000008',
    expireMonth: '12',
    expireYear: '2030',
    cvc: '123',
    cardHolderName: 'John Doe',
  },
  failure: {
    cardNumber: '5406670000000009',
    expireMonth: '12',
    expireYear: '2030',
    cvc: '123',
    cardHolderName: 'John Doe',
  },
  threeDSecure: {
    cardNumber: '4603450000000000',
    expireMonth: '12',
    expireYear: '2030',
    cvc: '123',
    cardHolderName: 'John Doe',
  },
};

// Export for advanced usage
export { getIyzipay, Iyzipay };

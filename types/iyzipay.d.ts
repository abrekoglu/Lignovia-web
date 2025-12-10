declare module "iyzipay" {
  interface IyzipayConfig {
    apiKey: string;
    secretKey: string;
    uri: string;
  }

  interface IyzipayRequest {
    locale?: string;
    conversationId?: string;
    [key: string]: any;
  }

  type IyzipayCallback = (err: any, result: any) => void;

  class Iyzipay {
    constructor(config: IyzipayConfig);

    static LOCALE: {
      TR: string;
      EN: string;
    };

    static CURRENCY: {
      TRY: string;
      USD: string;
      EUR: string;
      GBP: string;
      IRR: string;
      NOK: string;
      RUB: string;
      CHF: string;
    };

    static PAYMENT_CHANNEL: {
      WEB: string;
      MOBILE: string;
      MOBILE_WEB: string;
      MOBILE_IOS: string;
      MOBILE_ANDROID: string;
      MOBILE_WINDOWS: string;
      MOBILE_TABLET: string;
      MOBILE_PHONE: string;
    };

    static PAYMENT_GROUP: {
      PRODUCT: string;
      LISTING: string;
      SUBSCRIPTION: string;
    };

    static BASKET_ITEM_TYPE: {
      PHYSICAL: string;
      VIRTUAL: string;
    };

    apiTest: {
      retrieve(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    threedsInitialize: {
      create(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    threedsPayment: {
      create(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    payment: {
      create(request: IyzipayRequest, callback: IyzipayCallback): void;
      retrieve(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    installmentInfo: {
      retrieve(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    cancel: {
      create(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    refund: {
      create(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    checkoutFormInitialize: {
      create(request: IyzipayRequest, callback: IyzipayCallback): void;
    };

    checkoutForm: {
      retrieve(request: IyzipayRequest, callback: IyzipayCallback): void;
    };
  }

  export = Iyzipay;
}

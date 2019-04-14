export enum PaymentMethods {
  CASH = 1,
  CASHLESS
}

export const paymentMethods = {
  [PaymentMethods.CASH]: 'Cash',
  [PaymentMethods.CASHLESS]: 'Cashless'
};

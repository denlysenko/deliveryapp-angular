export enum PaymentMethod {
  CASH = 1,
  CASHLESS
}

export const paymentMethods = {
  [PaymentMethod.CASH]: 'Cash',
  [PaymentMethod.CASHLESS]: 'Cashless'
};

export enum PaymentMethod {
  CASH = 1,
  CASHLESS
}

export const paymentMethodNames = {
  [PaymentMethod.CASH]: 'Cash',
  [PaymentMethod.CASHLESS]: 'Cashless'
};

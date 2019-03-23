export enum FormGroupKeys {
  destinationForm = 'destination',
  cargoForm = 'cargo',
  senderForm = 'sender'
}

export const destinationFormRequiredFields = new Set([
  'cityFrom',
  'cityTo',
  'addressFrom',
  'addressTo'
]);

export const cargoFormRequiredFields = new Set(['cargoName', 'cargoWeight']);
export const senderFormRequiredFields = new Set(['senderEmail', 'senderPhone']);
export const ERROR_MESSAGE = 'Order creation failed';

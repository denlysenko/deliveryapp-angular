import { User } from '@users/models';

export interface Order {
  id?: number;
  cityFrom: string;
  cityTo: string;
  addressFrom: string;
  addressTo: string;
  cargoName: string;
  additionalData?: string;
  comment?: string;
  cargoWeight: number;
  cargoVolume?: number;
  senderName?: string;
  senderCompany?: string;
  senderEmail: string;
  senderPhone: string;
  status?: number;
  deliveryCosts?: number;
  deliveryDate?: Date;
  paid?: boolean;
  paymentDate?: Date;
  invoiceId?: number;
  // TODO Payment interface
  payment?: any;
  clientId?: number;
  client?: User;
  creatorId?: number;
  creator?: User;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

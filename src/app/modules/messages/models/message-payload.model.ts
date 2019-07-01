export interface MessagePayload {
  notification: {
    title: string;
    body: string;
  };
  data: {
    _id?: string;
    text: string;
    read: 'true' | 'false';
    recipientId: string;
    forEmployee: 'true' | 'false';
    createdAt: string;
  };
}

export interface Meta {
  giftcard?: string;
  value?: string;
}
export interface ITransaction {
  _id: string;
  type: string;
  userId: string;
  amount: number;
  createdAt: Date;
  reference: string;
  status: string;
  description: string;
  currency: string;
  meta: Meta;
}

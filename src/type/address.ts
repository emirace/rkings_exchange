export interface IAddress {
  _id: string;
  userId: string;
  name: string;
  address: string;
  network: string;
  used?: boolean;
}

export interface AddressData {
  network: string;
  name: string;
}

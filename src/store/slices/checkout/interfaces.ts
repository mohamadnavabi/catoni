import { Address } from "data/data";

export interface CheckoutState {
  addresses: Address[];
  selectedAddress?: Address;
  addressFormButtonLoading: boolean;
}

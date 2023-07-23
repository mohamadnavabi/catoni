import { Paginate } from "services/http/interface";
import { Product } from "../products";

export interface OrderState {
  list: Paginate<any>[];
  activeOrder?: any;
  loading: boolean;
}

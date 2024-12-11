import { Order } from './Order';

export type StoreOrderRequest = Pick<
    Order,
    | 'product_id'
    | 'specifications'
    | 'quantity'
    | 'order_deadline_date'
    | 'order_deadline_time'
    | 'address'
    | 'pickup_type'
> & {
    files: File[];
};

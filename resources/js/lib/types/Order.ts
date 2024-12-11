import { Timestamps } from './Timestamps';

export type Order = {
    id: number;
    user_id: number;
    product_id: number;
    specifications: string;
    quantity: number;
    address: string;
    order_deadline_date: Date;
    order_deadline_time: string;
    pickup_type: 'Pickup' | 'Delivery';
    status: 'Cart' | 'Pending' | 'Completed' | 'Cancelled';
} & Timestamps;

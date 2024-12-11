import { Timestamps } from './Timestamps';

export type OrderFile = {
    id: number;
    order_id: number;
    filename: string;
} & Timestamps;

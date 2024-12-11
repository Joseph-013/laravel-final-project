import { Timestamps } from './Timestamps';

export type Product = {
    id: string;
    name: string;
    description: string;
    keyword: string;
    active: boolean;
} & Timestamps;

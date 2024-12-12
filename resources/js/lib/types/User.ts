import { Role } from './Role';
import { SoftDeletes } from './SoftDeletes';
import { Timestamps } from './Timestamps';

export type User = {
    id: number;
    username: string;
    fullname: string;
    email: string;
    social_username: string;
    contact_number: string;
    default_address: string;
    role: Role;
    remember_token: string | null;
    password: string;
} & Timestamps &
    SoftDeletes;

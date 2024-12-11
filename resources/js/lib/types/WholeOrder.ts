import { Order } from './Order';
import { Product } from './Product';
import { User } from './User';

export type WholeOrder = Order & { user: User; product: Product };

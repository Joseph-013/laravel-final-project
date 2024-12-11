import { Order } from './Order';
import { OrderFile } from './OrderFile';

export type WholeOrderFile = OrderFile & { order: Order };

export type OrderFile = {
    id: number;
    order_id: number;
    filename: string;
    created_at: Date;
    deleted_at?: Date;
};

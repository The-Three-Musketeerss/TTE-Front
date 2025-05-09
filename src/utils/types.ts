export type CategoryProps = {
    id: number;
    name: string;
}

export type ProductProps = {
    id?: number;
    title: string;
    price: number;
    description?: string;
    category?: string;
    image: string;
    inventory?: {total: number, available: number};
}
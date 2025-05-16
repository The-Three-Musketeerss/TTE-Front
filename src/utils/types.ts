export type CategoryProps = {
  id: number;
  name: string;
};

export type ProductProps = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  quantity?: number;
  inventory?: { total: number; available: number };
};

export type CartItemProps = {
  userId: number;
  shoppingCart: {
    productId: number;
    quantity: number;
  }[];
  couponApplied: string | null;
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  shippingCost: number;
  finalTotal: number;
};

export type JobItemProps = {
  id: number;
  id_item: number;
  itemName: string;
  operation: string;
  type: string;
  createdAt: string;
  createdBy: string;
};

export type securityQuestionProps = {
  id: number;
  question: string;
};

export type orderProps = {
  id: number;
  userId: number;
  couponId: number | null;
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  shippingCost: number;
  finalTotal: number;
  status: string;
  customerName: string;
  address: string;
  paymentStatus: string;
  createdAt: string;
  orderItems?: {
    productId: number;
    quantity: number;
    price: number;
  }[];
};

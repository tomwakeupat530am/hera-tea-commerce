
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  detailDescription?: string;
  image: string;
  category: string;
  weight: string;
  stock: number;
  ingredients?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isAffiliate: boolean;
  referralCode: string;
  points: number;
  pointsHistory: PointsHistory[];
  orders: Order[];
  affiliateCommission?: number;
};

export type PointsHistory = {
  id: string;
  points: number;
  type: 'earned' | 'redeemed';
  description: string;
  date: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  shippingAddress: Address;
  trackingNumber?: string;
  referralCode?: string;
  affiliateCode?: string;
};

export type Address = {
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
};

export type Order = {
  price: string;
  amount: string;
};

export type OrderResponse = {
  bids: Order[];
  asks: Order[];
};

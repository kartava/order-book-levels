export type OrderList = Array<[price: string, amount: string]>;

export type BinanceOrders = {
  lastUpdateId: number;
  bids: OrderList;
  asks: OrderList;
};

export interface IDataProvider {
  makeApiCall<T>(path: string): Promise<T>;

  findOrders(symbol: string): Promise<BinanceOrders>;
}

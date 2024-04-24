import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { Ok, Result } from "oxide.ts";

import { FindOrdersQuery } from "@modules/orders/queries/find-levels/find-orders.queries";
import { BINANCE_DATA_PROVIDER } from "@modules/data-providers/data-providers.di-tokens";
import { BinanceDataService } from "@modules/data-providers/services/binance-data.service";
import { OrderList } from "@modules/data-providers/domain/types";
import { Order, OrderResponse } from "@modules/orders/domain/types";

@QueryHandler(FindOrdersQuery)
export class FindOrdersQueryHandler implements IQueryHandler {
  constructor(
    @Inject(BINANCE_DATA_PROVIDER)
    private readonly binanceDataService: BinanceDataService,
  ) {}

  filterOrders(orders: OrderList, volume: number): OrderList {
    return orders.filter((item) => Number(item[1]) > volume);
  }

  formatOrders(orders: OrderList): Order[] {
    return orders.map((order) => {
      return {
        price: order[0],
        amount: order[1],
      };
    });
  }

  async execute(query: FindOrdersQuery): Promise<Result<OrderResponse, Error>> {
    const orders = await this.binanceDataService.findOrders(query.symbol);

    const filteredBids = this.filterOrders(orders.bids, query.volume);
    const filteredAsks = this.filterOrders(orders.asks, query.volume);

    return Ok({
      bids: this.formatOrders(filteredBids),
      asks: this.formatOrders(filteredAsks),
    });
  }
}

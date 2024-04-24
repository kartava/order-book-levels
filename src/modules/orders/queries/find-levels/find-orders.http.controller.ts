import { QueryBus } from "@nestjs/cqrs";
import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { Result } from "oxide.ts";
import { routesV1 } from "@config/app.routes";
import { FindOrdersQuery } from "@modules/orders/queries/find-levels/find-orders.queries";
import { FindOrdersRequestDto } from "@modules/orders/queries/find-levels/find-orders.request.dto";
import { OrderResponseDto } from "@modules/orders/dtos/order.response.dto";
import { OrderResponse } from "@modules/orders/domain/types";

@Controller(routesV1.version)
export class FindOrdersHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.orders.root)
  @ApiOperation({ summary: "Find current orders" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrderResponseDto,
  })
  async findOrders(
    @Query() params: FindOrdersRequestDto,
  ): Promise<OrderResponseDto> {
    const query = new FindOrdersQuery({
      symbol: params.symbol,
      volume: params.volume,
    });
    const result: Result<OrderResponse, Error> =
      await this.queryBus.execute(query);

    const orders = result.unwrap();

    return new OrderResponseDto(orders);
  }
}

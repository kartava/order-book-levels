import { ApiProperty } from "@nestjs/swagger";
import { Order } from "@modules/orders/domain/types";

export class OrderResponseDto {
  @ApiProperty({
    description: "Current bids",
  })
  bids: Order[];

  @ApiProperty({
    description: "Current asks",
  })
  asks: Order[];

  constructor(props: OrderResponseDto) {
    this.bids = props.bids;
    this.asks = props.asks;
  }
}

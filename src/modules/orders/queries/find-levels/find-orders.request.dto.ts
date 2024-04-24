import { ApiProperty } from "@nestjs/swagger";

import { Type } from "class-transformer";
import { IsNumber, IsString, Matches, MaxLength } from "class-validator";

export class FindOrdersRequestDto {
  @ApiProperty({ example: "BTCUSDT", description: "Symbol" })
  @MaxLength(10)
  @IsString()
  @Matches(/^[A-Z]+USDT$/, { message: "symbol should end with USDT" })
  readonly symbol: string;

  @ApiProperty({ example: 5, description: "Volume" })
  @IsNumber()
  @Type(() => Number)
  readonly volume: number;
}

import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import { AxiosError } from "axios";
import { firstValueFrom } from "rxjs";
import { catchError } from "rxjs/operators";

import {
  BinanceOrders,
  IDataProvider,
} from "@modules/data-providers/domain/types";

@Injectable()
export class BinanceDataService implements IDataProvider {
  private readonly logger = new Logger(BinanceDataService.name);

  constructor(private readonly httpService: HttpService) {}

  async makeApiCall<T>(path: string): Promise<T> {
    //TODO: move to the env vars.
    const baseUrl = "https://api.binance.com/api/v3";
    const url = `${baseUrl}/${path}`;

    const { data } = await firstValueFrom(
      this.httpService.get<T>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error?.response?.data);
          throw Error(`An error happened while fetching: ${url}.`);
        }),
      ),
    );
    return data;
  }

  async findOrders(
    symbol: string,
    size: number = 5000,
  ): Promise<BinanceOrders> {
    const data = await this.makeApiCall<BinanceOrders>(
      `depth?symbol=${symbol}&limit=${size}`,
    );
    return data;
  }
}

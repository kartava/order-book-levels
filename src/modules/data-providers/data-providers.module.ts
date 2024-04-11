import { Global, Module, Provider } from "@nestjs/common";

import { HttpModule } from "@nestjs/axios";

import { BINANCE_DATA_PROVIDER } from "@modules/data-providers/data-providers.di-tokens";
import { BinanceDataService } from "@modules/data-providers/services/binance-data.service";

const providers: Provider[] = [
  { provide: BINANCE_DATA_PROVIDER, useClass: BinanceDataService },
];

@Global()
@Module({
  imports: [HttpModule],
  providers: [...providers],
  exports: [...providers],
})
export class DataProvidersModule {}

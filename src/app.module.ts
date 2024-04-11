import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { SlonikModule } from "nestjs-slonik";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { RequestContextModule } from "nestjs-request-context";

import { postgresConnectionUri } from "@config/database.config";
import { ContextInterceptor } from "@libs/application/context/ContextInterceptor";
import { ExceptionInterceptor } from "@libs/application/interceptors/exception.interceptor";
import { UserModule } from "@modules/user/user.module";
import { DataProvidersModule } from "@modules/data-providers/data-providers.module";

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RequestContextModule,
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
    }),
    CqrsModule,
    // Modules
    UserModule,
    DataProvidersModule,
  ],
  providers: [...interceptors],
})
export class AppModule {}

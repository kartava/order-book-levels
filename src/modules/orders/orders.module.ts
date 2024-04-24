import { Module, Provider } from "@nestjs/common";
import { FindOrdersHttpController } from "@modules/orders/queries/find-levels/find-orders.http.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { FindOrdersQueryHandler } from "@modules/orders/queries/find-levels/find-orders.query-handler";

const httpControllers = [FindOrdersHttpController];

const queryHandlers: Provider[] = [FindOrdersQueryHandler];

@Module({
  imports: [CqrsModule],
  providers: [...queryHandlers],
  controllers: [...httpControllers],
})
export class OrdersModule {}

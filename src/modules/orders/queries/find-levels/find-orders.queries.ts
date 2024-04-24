import { QueryBase } from "@libs/ddd/query.base";

export class FindOrdersQuery extends QueryBase {
  readonly symbol: string;

  readonly volume: number;

  constructor(props: FindOrdersQuery) {
    super();
    this.symbol = props.symbol;
    this.volume = props.volume;
  }
}

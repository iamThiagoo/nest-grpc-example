import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

type Order = {
  order_id: string;
  account_id: string;
  asset_id: string;
  quantity: number;
  status: string;
};

export interface OrderGrpcClient {
  createOrder(
    data: {
      account_id: string;
      asset_id: string;
      quantity: number;
    },
    metadata?: Metadata,
  ): Observable<{ order: Order }>;

  findAllOrders(
    data: { account_id: string },
    metadata?: Metadata,
  ): Observable<{ orders: Order[] }>;

  findOneOrder(
    data: { order_id: string },
    metadata?: Metadata,
  ): Observable<{ order: Order }>;
}

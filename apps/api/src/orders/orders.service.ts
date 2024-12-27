import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { lastValueFrom } from 'rxjs';
import { OrderGrpcClient } from './interface/order.interface';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class OrdersService implements OnModuleInit {
  private orderGrpcClient: OrderGrpcClient;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'test',
      protoPath: [join(__dirname, 'orders', 'proto', 'orders.proto')],
      loader: { keepCase: true },
    },
  })
  clientGrpc: ClientGrpc;

  onModuleInit() {
    this.orderGrpcClient = this.clientGrpc.getService('OrderService');
  }

  async create(createOrderDto: CreateOrderDto) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer 1234');
    const result = await lastValueFrom(
      this.orderGrpcClient.createOrder(createOrderDto, metadata),
    );
    return result.order;
  }

  async findAll(account_id: string) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer 1234');
    const result = await lastValueFrom(
      this.orderGrpcClient.findAllOrders({ account_id }, metadata),
    );
    return result.orders;
  }

  async findOne(order_id: string) {
    const metadata = new Metadata();
    metadata.set('authorization', 'Bearer 1234');
    const result = await lastValueFrom(
      this.orderGrpcClient.findOneOrder({ order_id }, metadata),
    );
    return result.order;
  }
}

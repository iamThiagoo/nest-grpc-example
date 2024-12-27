import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @GrpcMethod('OrderService')
  async createOrder(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return {
      order: {
        order_id: order.id.toString(),
        account_id: order.account_id,
        asset_id: order.asset_id,
        quantity: order.quantity,
        status: order.status,
      },
    };
  }

  @GrpcMethod('OrderService')
  async findAllOrders(@Payload() findAllOrdersDto: { account_id: string }) {
    const orders = await this.ordersService.findAll(
      findAllOrdersDto.account_id,
    );
    return {
      orders: orders.map((order) => ({
        order_id: order.id.toString(),
        account_id: order.account_id,
        asset_id: order.asset_id,
        quantity: order.quantity,
        status: order.status,
      })),
    };
  }

  @GrpcMethod('OrderService')
  async findOneOrder(@Payload() findOneOrderDto: { order_id: string }) {
    const order = await this.ordersService.findOne(findOneOrderDto.order_id);
    return {
      order: {
        order_id: order.id.toString(),
        account_id: order.account_id,
        asset_id: order.asset_id,
        quantity: order.quantity,
        status: order.status,
      },
    };
  }
}

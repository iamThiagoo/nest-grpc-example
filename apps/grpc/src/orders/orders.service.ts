import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  create(dto: CreateOrderDto) {
    return this.orderModel.create({
      ...dto,
      status: 'PENDING',
    });
  }

  findAll(account_id: string) {
    return this.orderModel.find({ account_id });
  }

  findOne(id: string) {
    return this.orderModel.findById(id);
  }
}

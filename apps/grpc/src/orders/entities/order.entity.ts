import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  account_id: string;

  @Prop()
  asset_id: string;

  @Prop()
  quantity: number;

  @Prop()
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

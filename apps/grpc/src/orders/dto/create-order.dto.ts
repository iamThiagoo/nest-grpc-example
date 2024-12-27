import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  account_id: string;

  @IsNotEmpty()
  asset_id: string;

  @IsNotEmpty()
  quantity: number;
}

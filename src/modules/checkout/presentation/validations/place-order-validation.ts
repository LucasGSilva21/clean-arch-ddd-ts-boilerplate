import { OrderStatus } from '@checkout/domain/entities';
import { PlaceOrderInputDto } from '@checkout/application/dtos';
import { Validation } from '@shared/presentation/protocols';
import { InvalidParameterError } from '@shared/presentation/errors';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsEnum,
  IsNotEmpty,
  validate as validator
} from 'class-validator';

class PlaceOrderValidationModel {
  @IsString()
  @IsNotEmpty()
    productId: string;

  @IsEnum(OrderStatus)
  @IsNotEmpty()
    status: OrderStatus;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
    totalInCents: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
    amount: number;
}

export class PlaceOrderValidation implements Validation<PlaceOrderInputDto> {
  async validate (input: PlaceOrderInputDto): Promise<void> {
    const placeOrderValidate = new PlaceOrderValidationModel();

    placeOrderValidate.productId = input.productId;
    placeOrderValidate.status = input.status;
    placeOrderValidate.totalInCents = input.totalInCents;
    placeOrderValidate.amount = input.amount;

    const errors = await validator(placeOrderValidate);

    if (errors.length > 0) {
      const message = Object.values(errors[0].constraints)[0];
      throw new InvalidParameterError(message);
    }
  }
}

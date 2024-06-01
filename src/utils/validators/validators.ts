import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { InjectConnection } from '@nestjs/typeorm';
import { MongoRepository, Connection } from 'typeorm';

export type IsUniqueInterface = {
  tableName: string;
  column: string;
};

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const { tableName, column }: IsUniqueInterface = args.constraints[0];

    // Verificação se o valor já existe no banco de dados
    const repository: MongoRepository<any> =
      this.connection.getMongoRepository(tableName);
    const dataExist = await repository.findOne({ [column]: value });

    return !dataExist;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const field: string = validationArguments.property;
    return `the ${field} already exists`;
  }
}

// Função do decorator
export function isUnique(
  options: IsUniqueInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}

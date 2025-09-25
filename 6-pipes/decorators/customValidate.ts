import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function CustomValidate(validationOptions?: ValidationOptions): PropertyDecorator {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'customValidate',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return value === 'Mehmet'; // Örnek: değer 'Mehmet' ise geçerli kabul et
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be 'Mehmet'`;
                }
            }
        });
    };
}

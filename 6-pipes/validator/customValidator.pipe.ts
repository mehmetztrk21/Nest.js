import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

export const customValidatorPipe = new ValidationPipe({
    transform: true,
    whitelist: false,
    forbidNonWhitelisted: false,
    exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException({
            message: 'Validation failed !',
            errors: errors.map(error => ({
                field: error.property,
                messages: Object.values(error.constraints || {})
            }))
        });
    }
});

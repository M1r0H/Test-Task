import { ValidationException } from '@core/exceptions';
import { Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  public constructor() {
    super({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
        exposeUnsetFields: false,
      },
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    });
  }

  public createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown {
    return (errors: ValidationError[]) => {
      const fields = errors.reduce((acc, value) => {
        if (value.property === 'password') {
          return acc;
        }

        function getConstraints(error: ValidationError): { [key: string]: string } {
          let constraints = {};

          function getNestedConstraints(error: ValidationError): void {
            const errorConstraints = error.constraints
              ? Object.entries(error.constraints).reduce((acc, [key, value]) => {
                acc[key] = value;

                return acc;
              }, {})
              : {};

            constraints = { ...constraints, ...errorConstraints };

            if (!error.children || !error.children.length) {
              return;
            }

            for (const child of error.children) {
              getNestedConstraints(child);
            }
          }

          getNestedConstraints(error);

          return constraints;
        }

        return { ...(acc ?? {}), [value.property]: Object.values(getConstraints(value)) };
      }, null);

      const messages = {
        name: 'validation',
        message: 'Bad Request',
        ...(fields && { fields }),
      };

      throw new ValidationException(messages);
    };
  }
}

import { ContextHelper } from '@core/helpers';
import { Injectable } from '@nestjs/common';
import { ContextId, ModuleRef } from '@nestjs/core';
import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Request } from 'express';

@Injectable()
export abstract class ContextResolveDecorator implements ValidatorConstraintInterface {
  protected contextId: ContextId;
  protected request: Request;

  public constructor(
    protected readonly moduleRef: ModuleRef,
  ) {
  }

  public abstract process(value: unknown, data: ValidationArguments): boolean | Promise<boolean>;

  public validate(value: unknown, data: ValidationArguments): boolean | Promise<boolean> {
    this.contextId = ContextHelper.get('contextId');
    this.request = ContextHelper.get('context').switchToHttp().getRequest();

    return this.process(value, data);
  }
}

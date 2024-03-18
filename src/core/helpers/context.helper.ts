import { ClsServiceManager } from 'nestjs-cls';
import { ClsStore } from 'nestjs-cls/dist/src/lib/cls.options';
import { DeepPropertyType, RecursiveKeyOf } from 'nestjs-cls/dist/src/types/recursive-key-of.type';
import { AppCls } from '@core/types';
import { AnyIfNever, StringIfNever, TypeIfUndefined } from 'nestjs-cls/dist/src/types/type-if-type.type';

export class ContextHelper {
  public static set<
    T extends RecursiveKeyOf<AppCls> = RecursiveKeyOf<AppCls>,
    P extends DeepPropertyType<AppCls, T> = DeepPropertyType<AppCls, T>
  >(key: StringIfNever<T> | keyof ClsStore, value: AnyIfNever<P>): void {
    return ClsServiceManager.getClsService<AppCls>().set(key, value);
  }

  public static get<
    R = undefined,
    T extends RecursiveKeyOf<AppCls> = RecursiveKeyOf<AppCls>,
    P = DeepPropertyType<AppCls, T>
    // eslint-disable-next-line max-len
  >(key?: StringIfNever<T> | keyof ClsStore): TypeIfUndefined<R, TypeIfUndefined<typeof key, AppCls, AnyIfNever<P>>, R> {
    return ClsServiceManager.getClsService<AppCls>().get(key);
  }
}

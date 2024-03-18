import { PureAbility } from '@casl/ability';
import { Subjects } from '@modules/roles/types';
import { User } from '@modules/users/entities';
import { ExecutionContext } from '@nestjs/common';
import { ContextId } from '@nestjs/core';
import { ClsStore } from 'nestjs-cls';

export interface AppCls extends ClsStore {
  contextId: ContextId;
  context: ExecutionContext;
  modules: {
    auth: {
      user: User;
      permissions: string[];
    };
    roles: {
      ability: PureAbility<[string, Subjects]>;
    };
  };
}

import { AbilityBuilder, AbilityClass, ExtractSubjectType, PureAbility } from '@casl/ability';
import { AppAbility, Subjects } from '@modules/roles/types';
import { Injectable } from '@nestjs/common';
import { ContextHelper } from '@core/helpers';
import { Compare } from '@modules/roles/roles.constants';

@Injectable()
export class RolesPermissionsService {
  public createAbility(permissions: string[]): PureAbility<[string, Subjects]> {
    const { can, build } = new AbilityBuilder<PureAbility<[string, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>,
    );

    permissions.forEach((value) => {
      can(value, 'all');
    });

    const ability = build({
      detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
    });

    ContextHelper.set('modules.roles.ability', ability);

    return ability;
  }

  public getAbility(): PureAbility<[string, Subjects]> | undefined {
    return ContextHelper.get('modules.roles.ability');
  }

  public can(permission: string | string[], compare: Compare = Compare.some): boolean {
    const ability = this.getAbility();

    if (!ability) {
      return false;
    }

    if (typeof permission === 'string') {
      return (ability.can(permission, 'all') || ability.can('all', 'all'));
    }

    return permission.map((per) => (
      ability?.can(per, 'all') || ability?.can('all', 'all')
    ))[compare]((per: boolean) => per === true);
  }
}

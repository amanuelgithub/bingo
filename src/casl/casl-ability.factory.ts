import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, UserRoleEnum } from '../users/entities/user.entity';
import { Branch } from 'src/branches/entities/branch.entity';
import { Agent } from 'src/agents/entities/agent.entity';
import { Cashier } from 'src/cashiers/entities/cashier.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<typeof User | typeof Branch | typeof Agent | typeof Cashier>
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: any) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    console.log('user: ', user);

    if (user?.role === UserRoleEnum.SUPER_ADMIN) {
      // gives full-right over-all subjects
      can(Action.Manage, 'all');
    } else if (user.role === UserRoleEnum.AGENT) {
      console.log('user role: ', user.role);
      // Agent
      can(Action.Create, Agent);
      can(Action.Manage, Agent);
      can(Action.Read, Agent);
      can(Action.Delete, Agent);

      // // Branch
      // can(Action.Manage, Agent);

      // // Cashier
      can(Action.Create, Cashier);
      can(Action.Manage, Cashier);
      can(Action.Read, Cashier);
      can(Action.Delete, Cashier);
    } else if (user?.role === UserRoleEnum.CASHIER) {
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

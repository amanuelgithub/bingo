import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, UserTypeEnum } from '../users/entities/user.entity';
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

    if (user?.role === UserTypeEnum.SUPER_ADMIN) {
      // gives full-right over-all subjects
      can(Action.Manage, 'all');
    } else if (user?.role === UserTypeEnum.AGENT) {
      // Agent
      can(Action.Create, Agent);
      can(Action.Manage, Agent);
      can(Action.Read, Agent);
      can(Action.Delete, Agent);

      // Cashier
      can(Action.Create, Cashier);
    } else if (user?.role === UserTypeEnum.CASHIER) {
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

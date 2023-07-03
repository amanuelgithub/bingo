import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, UserRoleEnum } from '../users/entities/user.entity';
import { Branch } from '../branches/entities/branch.entity';
import { Agent } from '../agents/entities/agent.entity';
import { Cashier } from '../cashiers/entities/cashier.entity';
import { Game } from 'src/games/entities/game.entity';
import { Play } from 'src/plays/entities/play.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Branch
      | typeof Agent
      | typeof Cashier
      | typeof Game
      | typeof Play
    >
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

      // Play
      can(Action.Read, Play);

      // // Branch
      can(Action.Read, Branch);

      // // Cashier
      can(Action.Create, Cashier);
      can(Action.Manage, Cashier);
      can(Action.Read, Cashier);
      can(Action.Delete, Cashier);
    } else if (user?.role === UserRoleEnum.CASHIER) {
      // // Game
      can(Action.Create, Game);
      can(Action.Manage, Game);
      can(Action.Read, Game);
      can(Action.Update, Game);

      // // Play
      can(Action.Create, Play);
      can(Action.Manage, Play);
      can(Action.Read, Play);
      can(Action.Update, Play);

      // // Cashier
      can(Action.Read, Cashier);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

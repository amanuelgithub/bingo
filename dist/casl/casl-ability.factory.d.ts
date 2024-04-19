import { Ability, InferSubjects } from '@casl/ability';
import { User } from '../users/entities/user.entity';
import { Branch } from '../branches/entities/branch.entity';
import { Agent } from '../agents/entities/agent.entity';
import { Cashier } from '../cashiers/entities/cashier.entity';
import { Game } from 'src/games/entities/game.entity';
import { Play } from 'src/plays/entities/play.entity';
export declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete"
}
type Subjects = InferSubjects<typeof User | typeof Branch | typeof Agent | typeof Cashier | typeof Game | typeof Play> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;
export declare class CaslAbilityFactory {
    createForUser(user: any): Ability<[Action, Subjects], import("@casl/ability").MongoQuery>;
}
export {};

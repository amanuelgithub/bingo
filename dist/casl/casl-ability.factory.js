"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslAbilityFactory = exports.Action = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const branch_entity_1 = require("../branches/entities/branch.entity");
const agent_entity_1 = require("../agents/entities/agent.entity");
const cashier_entity_1 = require("../cashiers/entities/cashier.entity");
const game_entity_1 = require("../games/entities/game.entity");
const play_entity_1 = require("../plays/entities/play.entity");
var Action;
(function (Action) {
    Action["Manage"] = "manage";
    Action["Create"] = "create";
    Action["Read"] = "read";
    Action["Update"] = "update";
    Action["Delete"] = "delete";
})(Action = exports.Action || (exports.Action = {}));
let CaslAbilityFactory = class CaslAbilityFactory {
    createForUser(user) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.Ability);
        console.log('user: ', user);
        if ((user === null || user === void 0 ? void 0 : user.role) === user_entity_1.UserRoleEnum.SUPER_ADMIN) {
            can(Action.Manage, 'all');
        }
        else if (user.role === user_entity_1.UserRoleEnum.AGENT) {
            console.log('user role: ', user.role);
            can(Action.Create, agent_entity_1.Agent);
            can(Action.Manage, agent_entity_1.Agent);
            can(Action.Read, agent_entity_1.Agent);
            can(Action.Delete, agent_entity_1.Agent);
            can(Action.Read, play_entity_1.Play);
            can(Action.Read, branch_entity_1.Branch);
            can(Action.Create, cashier_entity_1.Cashier);
            can(Action.Manage, cashier_entity_1.Cashier);
            can(Action.Read, cashier_entity_1.Cashier);
            can(Action.Delete, cashier_entity_1.Cashier);
        }
        else if ((user === null || user === void 0 ? void 0 : user.role) === user_entity_1.UserRoleEnum.CASHIER) {
            can(Action.Create, game_entity_1.Game);
            can(Action.Manage, game_entity_1.Game);
            can(Action.Read, game_entity_1.Game);
            can(Action.Update, game_entity_1.Game);
            can(Action.Create, play_entity_1.Play);
            can(Action.Manage, play_entity_1.Play);
            can(Action.Read, play_entity_1.Play);
            can(Action.Update, play_entity_1.Play);
            can(Action.Read, cashier_entity_1.Cashier);
        }
        return build({
            detectSubjectType: (item) => item.constructor,
        });
    }
};
CaslAbilityFactory = __decorate([
    (0, common_1.Injectable)()
], CaslAbilityFactory);
exports.CaslAbilityFactory = CaslAbilityFactory;
//# sourceMappingURL=casl-ability.factory.js.map
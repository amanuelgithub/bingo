"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserStatusEnum = exports.UserRoleEnum = void 0;
const agent_entity_1 = require("../../agents/entities/agent.entity");
const cashier_entity_1 = require("../../cashiers/entities/cashier.entity");
const typeorm_1 = require("typeorm");
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRoleEnum["AGENT"] = "AGENT";
    UserRoleEnum["CASHIER"] = "CASHIER";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
var UserStatusEnum;
(function (UserStatusEnum) {
    UserStatusEnum["ACTIVE"] = "ACTIVE";
    UserStatusEnum["INACTIVE"] = "INACTIVE";
})(UserStatusEnum || (exports.UserStatusEnum = UserStatusEnum = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "modifiedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => agent_entity_1.Agent, (agent) => agent.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", agent_entity_1.Agent)
], User.prototype, "agent", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => cashier_entity_1.Cashier, (cashier) => cashier.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", cashier_entity_1.Cashier)
], User.prototype, "cashier", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map
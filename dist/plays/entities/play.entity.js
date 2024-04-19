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
exports.Play = exports.CardStateEnum = void 0;
const game_entity_1 = require("../../games/entities/game.entity");
const typeorm_1 = require("typeorm");
var CardStateEnum;
(function (CardStateEnum) {
    CardStateEnum["NORMAL"] = "NORMAL";
    CardStateEnum["WIN"] = "WIN";
})(CardStateEnum || (exports.CardStateEnum = CardStateEnum = {}));
let Play = class Play {
};
exports.Play = Play;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Play.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Play.prototype, "branchId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Play.prototype, "gameId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Play.prototype, "cardId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Play.prototype, "cashierId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Play.prototype, "money", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Play.prototype, "cardState", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_entity_1.Game, (game) => game.plays, { onDelete: 'CASCADE' }),
    __metadata("design:type", game_entity_1.Game)
], Play.prototype, "game", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Play.prototype, "createdAt", void 0);
exports.Play = Play = __decorate([
    (0, typeorm_1.Entity)()
], Play);
//# sourceMappingURL=play.entity.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCashierDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cashier_dto_1 = require("./create-cashier.dto");
class UpdateCashierDto extends (0, swagger_1.PartialType)(create_cashier_dto_1.CreateCashierDto) {
}
exports.UpdateCashierDto = UpdateCashierDto;
//# sourceMappingURL=update-cashier.dto.js.map
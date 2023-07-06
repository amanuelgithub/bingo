"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlayDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_play_dto_1 = require("./create-play.dto");
class UpdatePlayDto extends (0, swagger_1.PartialType)(create_play_dto_1.CreatePlayDto) {
}
exports.UpdatePlayDto = UpdatePlayDto;
//# sourceMappingURL=update-play.dto.js.map
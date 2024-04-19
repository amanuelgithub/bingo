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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchesService = void 0;
const common_1 = require("@nestjs/common");
const branch_entity_1 = require("./entities/branch.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const branch_created_event_1 = require("./events/branch-created.event");
let BranchesService = class BranchesService {
    constructor(branchesRepository, eventEmitter) {
        this.branchesRepository = branchesRepository;
        this.eventEmitter = eventEmitter;
    }
    async create(createBranchDto) {
        const branch = this.branchesRepository.create(createBranchDto);
        if (!branch) {
            throw new common_1.ConflictException('branch already exists!');
        }
        await this.branchesRepository.save(branch);
        const branchCreatedEvent = new branch_created_event_1.BranchCreatedEvent();
        branchCreatedEvent.branchId = branch.id;
        this.eventEmitter.emit('branch.created', branchCreatedEvent);
        return branch;
    }
    async findAll() {
        const branches = await this.branchesRepository.find();
        if (!branches) {
            throw new common_1.NotFoundException('branches not found!');
        }
        return branches;
    }
    async findOne(id) {
        const branch = await this.branchesRepository.findOne({ where: { id } });
        if (!branch) {
            throw new common_1.NotFoundException('branch not found!');
        }
        return branch;
    }
    async findAgentBranches(agentId) {
        const branches = await this.branchesRepository
            .createQueryBuilder('branch')
            .leftJoinAndSelect('branch.agents', 'agent')
            .where('agent.id = :agentId', { agentId })
            .getMany();
        if (!branches) {
            throw new common_1.NotFoundException('branches not found!');
        }
        return branches;
    }
};
exports.BranchesService = BranchesService;
exports.BranchesService = BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(branch_entity_1.Branch)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], BranchesService);
//# sourceMappingURL=branches.service.js.map
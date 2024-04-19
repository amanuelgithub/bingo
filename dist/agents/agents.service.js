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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const agent_entity_1 = require("./entities/agent.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
const branches_service_1 = require("../branches/branches.service");
let AgentsService = class AgentsService {
    constructor(agentsRepository, usersRepository, branchesService) {
        this.agentsRepository = agentsRepository;
        this.usersRepository = usersRepository;
        this.branchesService = branchesService;
    }
    async create(createAgentDto) {
        const { username, phone, email, role, status, password: pass, branchId, } = createAgentDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(pass, salt);
        const branch = await this.branchesService.findOne(branchId);
        let agent;
        try {
            const user = this.usersRepository.create({
                username,
                phone,
                email,
                role,
                status,
                password: hashedPassword,
            });
            await this.usersRepository.save(user);
            const { password, createdAt, modifiedAt } = user, restUserInfo = __rest(user, ["password", "createdAt", "modifiedAt"]);
            agent = this.agentsRepository.create({
                userId: user.id,
                user: restUserInfo,
                branches: [branch],
            });
            await this.agentsRepository.save(agent);
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                const userName = await this.usersRepository.findOne({
                    where: { username },
                });
                if (userName) {
                    throw new common_1.ConflictException('username is taken!');
                }
                const userEmail = await this.usersRepository.findOne({
                    where: { email },
                });
                if (userEmail) {
                    throw new common_1.ConflictException('email is taken!');
                }
                const userPhone = await this.usersRepository.findOne({
                    where: { phone },
                });
                if (userPhone) {
                    throw new common_1.ConflictException('phone is taken!');
                }
            }
        }
        return agent;
    }
    async findAll() {
        const agents = await this.agentsRepository
            .createQueryBuilder('agent')
            .leftJoin('agent.user', 'user')
            .addSelect([
            'user.username',
            'user.phone',
            'user.email',
            'user.isEmailVerified',
            'user.role',
            'user.status',
        ])
            .getMany();
        if (!agents) {
            throw new common_1.NotFoundException('agents not found!');
        }
        return agents;
    }
    async findOne(id) {
        const agent = await this.agentsRepository
            .createQueryBuilder('agent')
            .where('agent.id = :id', { id })
            .leftJoin('agent.user', 'user')
            .addSelect([
            'user.username',
            'user.phone',
            'user.email',
            'user.isEmailVerified',
            'user.role',
            'user.status',
        ])
            .leftJoinAndSelect('agent.branches', 'branches')
            .getOne();
        if (!agent) {
            throw new common_1.NotFoundException('agent not found!');
        }
        return agent;
    }
    async addBranchToAgent(agentId, branchId) {
        const agent = await this.agentsRepository
            .createQueryBuilder('agent')
            .where('agent.id = :id', { id: agentId })
            .leftJoinAndSelect('agent.branches', 'branches')
            .getOne();
        const branch = await this.branchesService.findOne(branchId);
        agent.branches.push(branch);
        await this.agentsRepository.save(agent);
        return agent;
    }
    async findAgentBranches(agentId) {
        const agentBranches = await this.agentsRepository
            .createQueryBuilder('agent')
            .where('agent.id = :agentId', { agentId })
            .leftJoinAndSelect('agent.branches', 'branches')
            .getOne();
        if (!agentBranches) {
            throw new common_1.NotFoundException('agent not found!');
        }
        return agentBranches;
    }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(agent_entity_1.Agent)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        branches_service_1.BranchesService])
], AgentsService);
//# sourceMappingURL=agents.service.js.map
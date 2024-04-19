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
exports.CashiersService = void 0;
const common_1 = require("@nestjs/common");
const cashier_entity_1 = require("./entities/cashier.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const branches_service_1 = require("../branches/branches.service");
const bcrypt = require("bcrypt");
const plays_service_1 = require("../plays/plays.service");
let CashiersService = class CashiersService {
    constructor(cashiersRepository, usersRepository, branchesService, playsService) {
        this.cashiersRepository = cashiersRepository;
        this.usersRepository = usersRepository;
        this.branchesService = branchesService;
        this.playsService = playsService;
    }
    async create(createCashierDto) {
        const { username, phone, email, role, status, password: pass, branchId, } = createCashierDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(pass, salt);
        const branch = await this.branchesService.findOne(branchId);
        let cashier;
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
            cashier = this.cashiersRepository.create({
                userId: user.id,
                branchId: branch.id,
                user: restUserInfo,
                lastCheckout: new Date(),
                branch,
            });
            await this.cashiersRepository.save(cashier);
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
        return cashier;
    }
    async findBranchCashiers(branchId) {
        const cashiers = await this.cashiersRepository
            .createQueryBuilder('cashier')
            .leftJoin('cashier.user', 'user')
            .addSelect([
            'user.username',
            'user.phone',
            'user.email',
            'user.isEmailVerified',
            'user.role',
            'user.status',
        ])
            .leftJoin('cashier.branch', 'branch')
            .addSelect(['branch.name'])
            .andWhere('branch.id = :branchId', { branchId })
            .getMany();
        if (!cashiers) {
            throw new common_1.NotFoundException('cashiers not found!');
        }
        return cashiers;
    }
    async findAgentCashiers(agentId) {
        const branches = await this.branchesService.findAgentBranches(agentId);
        const cashiers = await this.cashiersRepository
            .createQueryBuilder('cashier')
            .leftJoin('cashier.user', 'user')
            .addSelect([
            'user.username',
            'user.phone',
            'user.email',
            'user.isEmailVerified',
            'user.role',
            'user.status',
        ])
            .leftJoin('cashier.branch', 'branch')
            .addSelect(['branch.name'])
            .andWhere('branch.id IN (:branchIds)', {
            branchIds: branches.map((b) => b.id),
        })
            .getMany();
        if (!cashiers) {
            throw new common_1.NotFoundException('cashiers not found!');
        }
        return cashiers;
    }
    async findOne(id) {
        const cashier = await this.cashiersRepository
            .createQueryBuilder('cashier')
            .where('cashier.id = :id', { id })
            .leftJoin('cashier.user', 'user')
            .addSelect([
            'user.username',
            'user.phone',
            'user.email',
            'user.isEmailVerified',
            'user.role',
            'user.status',
        ])
            .getOne();
        if (!cashier) {
            throw new common_1.NotFoundException('cashier not found!');
        }
        return cashier;
    }
    async findCashierCashBook(cashierId) {
        const cashier = await this.cashiersRepository.findOne({
            where: { id: cashierId },
        });
        if (!cashier) {
            throw new common_1.NotFoundException('Cashier not found!');
        }
        const dueCash = await this.playsService.findDueCashForCashier(cashierId, cashier.lastCheckout);
        return {
            lastCheckOutDate: cashier.lastCheckout,
            dueCash,
        };
    }
    async clearCashierCashBook(cashierId) {
        const cashier = await this.cashiersRepository.findOne({
            where: { id: cashierId },
        });
        if (!cashier) {
            throw new common_1.NotFoundException('Cashier not found!');
        }
        cashier.lastCheckout = new Date();
        await this.cashiersRepository.save(cashier);
        const dueCash = await this.playsService.findDueCashForCashier(cashierId, cashier.lastCheckout);
        return {
            lastCheckOutDate: cashier.lastCheckout,
            dueCash,
        };
    }
};
exports.CashiersService = CashiersService;
exports.CashiersService = CashiersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(cashier_entity_1.Cashier)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        branches_service_1.BranchesService,
        plays_service_1.PlaysService])
], CashiersService);
//# sourceMappingURL=cashiers.service.js.map
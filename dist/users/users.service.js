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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createSuperAdmin() {
        const password = 'aman@G!';
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const superAdminInfo = {
            username: 'SuperAdmin',
            phone: '0963158999',
            email: 'amanuelgirma070@gmail.com',
            isEmailVerified: true,
            role: user_entity_1.UserRoleEnum.SUPER_ADMIN,
            status: user_entity_1.UserStatusEnum.ACTIVE,
            password: hashedPassword,
        };
        const user = this.usersRepository.create(superAdminInfo);
        await this.usersRepository.save(user);
    }
    async create(createUserDto) {
        return 'create user';
    }
    findAll() {
        return `This action returns all users`;
    }
    async findOne(id) {
        const userRole = (await this.usersRepository.findOne({ where: { id } }))
            .role;
        let user;
        if (userRole === user_entity_1.UserRoleEnum.AGENT) {
            user = await this.usersRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id })
                .leftJoin('user.agent', 'agent')
                .addSelect('agent.id')
                .getOne();
        }
        else if (userRole === user_entity_1.UserRoleEnum.CASHIER) {
            user = await this.usersRepository
                .createQueryBuilder('user')
                .where('user.id = :id', { id })
                .leftJoin('user.cashier', 'cashier')
                .addSelect('cashier.branchId')
                .addSelect('cashier.id')
                .getOne();
        }
        else {
            user = await this.usersRepository.findOne({ where: { id } });
        }
        if (!user) {
            throw new common_1.NotFoundException('user not found!');
        }
        const { password } = user, restUserInfo = __rest(user, ["password"]);
        return restUserInfo;
    }
    async findOneByEmail(email) {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('user not found!');
        }
        return user;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
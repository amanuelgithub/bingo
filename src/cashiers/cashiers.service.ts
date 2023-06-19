import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesService } from 'src/branches/branches.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CashiersService {
  constructor(
    @InjectRepository(Cashier) private cashiersRepository: Repository<Cashier>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private branchesService: BranchesService,
  ) {}

  async create(createCashierDto: CreateCashierDto): Promise<Cashier> {
    const {
      username,
      phone,
      email,
      role,
      status,
      password: pass,
      branchId,
    } = createCashierDto;

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);

    // find branch
    const branch = await this.branchesService.findOne(branchId);
    const {
      agents,
      cashiers,
      createdAt: ct,
      modifiedAt: mt,
      ...restBranchInfo
    } = branch;

    const user = this.usersRepository.create({
      username,
      phone,
      email,
      role,
      status,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    const { password, createdAt, modifiedAt, ...restUserInfo } = user;

    //  create cashier
    const cashier = this.cashiersRepository.create({
      userId: user.id,
      branchId: branch.id,
      user: restUserInfo,
      branch: restBranchInfo,
    });
    return await this.cashiersRepository.save(cashier);
  }

  async findAll(): Promise<Cashier[]> {
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
      .getMany();

    if (!cashiers) {
      throw new NotFoundException('cashiers not found!');
    }
    return cashiers;
  }

  /** 
  findOne(id: number) {
    return `This action returns a #${id} cashier`;
  }

  update(id: number, updateCashierDto: UpdateCashierDto) {
    return `This action updates a #${id} cashier`;
  }

  remove(id: number) {
    return `This action removes a #${id} cashier`;
  }

  */
}

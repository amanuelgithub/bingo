import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesService } from '../branches/branches.service';
import * as bcrypt from 'bcrypt';
import { PlaysService } from 'src/plays/plays.service';
import { CashBook } from './cash-book.interface';

@Injectable()
export class CashiersService {
  constructor(
    @InjectRepository(Cashier) private cashiersRepository: Repository<Cashier>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private branchesService: BranchesService,
    private playsService: PlaysService,
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
      const { password, createdAt, modifiedAt, ...restUserInfo } = user;

      //  create cashier
      cashier = this.cashiersRepository.create({
        userId: user.id,
        branchId: branch.id,
        user: restUserInfo,
        lastCheckout: new Date(), // only on creation
        branch,
      });

      await this.cashiersRepository.save(cashier);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // username taken
        const userName = await this.usersRepository.findOne({
          where: { username },
        });
        if (userName) {
          throw new ConflictException('username is taken!');
        }

        // Email taken
        const userEmail = await this.usersRepository.findOne({
          where: { email },
        });
        if (userEmail) {
          throw new ConflictException('email is taken!');
        }

        // Phone taken
        const userPhone = await this.usersRepository.findOne({
          where: { phone },
        });
        if (userPhone) {
          throw new ConflictException('phone is taken!');
        }
      }
    }

    return cashier;
  }

  async findBranchCashiers(branchId: string): Promise<Cashier[]> {
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
      throw new NotFoundException('cashiers not found!');
    }
    return cashiers;
  }

  // agents can have multiple branches, so this function returns
  // all cashiers for all branches of the agent
  async findAgentCashiers(agentId: string): Promise<Cashier[]> {
    // find all branches of agent by agentId
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
      throw new NotFoundException('cashiers not found!');
    }
    return cashiers;
  }

  // find a cashier by id
  async findOne(id: string): Promise<Cashier> {
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
      throw new NotFoundException('cashier not found!');
    }
    return cashier;
  }

  async findCashierCashBook(cashierId: string): Promise<CashBook> {
    // lastCheckout date
    // due cash) -> amt of money since lastCheckout Date
    const cashier = await this.cashiersRepository.findOne({
      where: { id: cashierId },
    });
    if (!cashier) {
      throw new NotFoundException('Cashier not found!');
    }

    // find all money since the last checkout date from the 'play' table
    // new Date('2023-07-02 16:38:13.186728');
    const dueCash = await this.playsService.findDueCashForCashier(
      cashierId,
      cashier.lastCheckout,
      // new Date('2023-07-02 16:40:22.078369'),
    );

    return {
      lastCheckOutDate: cashier.lastCheckout,
      dueCash,
    };
  }

  async clearCashierCashBook(cashierId: string): Promise<CashBook> {
    const cashier = await this.cashiersRepository.findOne({
      where: { id: cashierId },
    });
    if (!cashier) {
      throw new NotFoundException('Cashier not found!');
    }

    // simply update the lastCheckout date to be current date
    cashier.lastCheckout = new Date();

    await this.cashiersRepository.save(cashier);

    // find all money since the last checkout date from the 'play' table
    const dueCash = await this.playsService.findDueCashForCashier(
      cashierId,
      cashier.lastCheckout,
    );

    return {
      lastCheckOutDate: cashier.lastCheckout,
      dueCash,
    };
  }
}

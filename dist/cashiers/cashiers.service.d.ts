import { CreateCashierDto } from './dto/create-cashier.dto';
import { Cashier } from './entities/cashier.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BranchesService } from '../branches/branches.service';
import { PlaysService } from 'src/plays/plays.service';
import { CashBook } from './cash-book.interface';
export declare class CashiersService {
    private cashiersRepository;
    private usersRepository;
    private branchesService;
    private playsService;
    constructor(cashiersRepository: Repository<Cashier>, usersRepository: Repository<User>, branchesService: BranchesService, playsService: PlaysService);
    create(createCashierDto: CreateCashierDto): Promise<Cashier>;
    findBranchCashiers(branchId: string): Promise<Cashier[]>;
    findAgentCashiers(agentId: string): Promise<Cashier[]>;
    findOne(id: string): Promise<Cashier>;
    findCashierCashBook(cashierId: string): Promise<CashBook>;
    clearCashierCashBook(cashierId: string): Promise<CashBook>;
}

import { CashiersService } from './cashiers.service';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { Cashier } from './entities/cashier.entity';
export declare class CashiersController {
    private readonly cashiersService;
    constructor(cashiersService: CashiersService);
    register(createCashierDto: CreateCashierDto): Promise<Cashier>;
    findOne(id: string): Promise<Cashier>;
    findBranchCashiers(branchId: string): Promise<Cashier[]>;
    findAgentCashiers(agentId: string): Promise<Cashier[]>;
    findCashierCashBook(cashierId: string, branchId: string): Promise<import("./cash-book.interface").CashBook>;
    clearCashierCashBook(cashierId: string, branchId: string): Promise<import("./cash-book.interface").CashBook>;
}

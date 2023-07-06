import { Branch } from '../../branches/entities/branch.entity';
import { User } from '../../users/entities/user.entity';
interface ICashier {
    id: string;
    lastCheckout: Date;
    userId: string;
    branchId: string;
    user: User;
    branch: Branch;
}
export declare class Cashier implements ICashier {
    id: string;
    lastCheckout: Date;
    userId: string;
    branchId: string;
    user: User;
    branch: Branch;
}
export {};

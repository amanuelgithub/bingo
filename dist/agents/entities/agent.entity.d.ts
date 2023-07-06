import { Branch } from '../../branches/entities/branch.entity';
import { User } from '../../users/entities/user.entity';
interface IAgent {
    id: string;
    userId: string;
    user: User;
    branches: Branch[];
}
export declare class Agent implements IAgent {
    id: string;
    userId: string;
    user: User;
    branches: Branch[];
}
export {};

import { Agent } from '../../agents/entities/agent.entity';
import { Cashier } from '../../cashiers/entities/cashier.entity';
interface IBranch {
    id: string;
    name: string;
    agents: Agent[];
    cashiers: Cashier[];
    createdAt: Date;
    modifiedAt: Date;
}
export declare class Branch implements IBranch {
    id: string;
    name: string;
    createdAt: Date;
    modifiedAt: Date;
    agents: Agent[];
    cashiers: Cashier[];
}
export {};

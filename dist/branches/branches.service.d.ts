import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class BranchesService {
    private branchesRepository;
    private eventEmitter;
    constructor(branchesRepository: Repository<Branch>, eventEmitter: EventEmitter2);
    create(createBranchDto: CreateBranchDto): Promise<Branch>;
    findAll(): Promise<Branch[]>;
    findOne(id: string): Promise<Branch>;
    findAgentBranches(agentId: string): Promise<Branch[]>;
}

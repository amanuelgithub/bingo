import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './entities/agent.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BranchesService } from '../branches/branches.service';
export declare class AgentsService {
    private agentsRepository;
    private usersRepository;
    private branchesService;
    constructor(agentsRepository: Repository<Agent>, usersRepository: Repository<User>, branchesService: BranchesService);
    create(createAgentDto: CreateAgentDto): Promise<Agent>;
    findAll(): Promise<Agent[]>;
    findOne(id: string): Promise<Agent>;
    addBranchToAgent(agentId: string, branchId: string): Promise<Agent>;
}

import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent } from './entities/agent.entity';
export declare class AgentsController {
    private readonly agentsService;
    constructor(agentsService: AgentsService);
    register(createAgentDto: CreateAgentDto): Promise<Agent>;
    findAll(): Promise<Agent[]>;
    findOne(id: string): Promise<Agent>;
    addBranchToAgent(agentId: string, branchId: string): Promise<Agent>;
}

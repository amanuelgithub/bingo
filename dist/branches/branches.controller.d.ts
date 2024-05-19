import { BranchesService } from './branches.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/create-branch.dto';
import { Branch } from './entities/branch.entity';
export declare class BranchesController {
    private readonly branchesService;
    constructor(branchesService: BranchesService);
    create(createBranchDto: CreateBranchDto): Promise<Branch>;
    findAgentBranches(agentId: string, req: any): Promise<Branch[]>;
    findOne(branchId: string): Promise<Branch>;
    updateBranch(branchId: string, updateBranchDto: UpdateBranchDto): Promise<Branch>;
    findAll(req: any): Promise<Branch[]>;
}

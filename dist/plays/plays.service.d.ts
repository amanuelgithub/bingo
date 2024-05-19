import { SellCardDto } from './dto/sell-card.dto';
import { Play } from './entities/play.entity';
import { Repository } from 'typeorm';
import { CardsService } from 'src/cards/cards.service';
import { AgentsService } from 'src/agents/agents.service';
import { BranchesService } from 'src/branches/branches.service';
export declare class PlaysService {
    private playsRepository;
    private cardsService;
    private agentsService;
    private branchesService;
    constructor(playsRepository: Repository<Play>, cardsService: CardsService, agentsService: AgentsService, branchesService: BranchesService);
    findUnsoldCards(branchId: string, gameId: string): Promise<any>;
    findGameSoldPlays(branchId: string, gameId: string): Promise<Play[]>;
    sellCard(sellCardDto: SellCardDto): Promise<Play>;
    findDueCashForCashier(cashierId: string, branchId: string, lastCheckoutDate: Date): Promise<number>;
    todayProfitForAllBranches(): Promise<number>;
    thisMonthProfitForAllBranches(): Promise<string>;
    thisYearProfitForAllBranches(): Promise<string>;
    totalProfitForAllBranches(): Promise<string>;
    twelveMonthProfitForAllBranches(): Promise<{
        month: string;
        profit: number;
    }[]>;
    todayProfitForAgentBranches(agentId: string): Promise<number>;
    thisMonthProfitsForAgentBranches(agentId: string): Promise<number>;
    totalProfitsForAgentBranches(agentId: string): Promise<number>;
    thisYearProfitForAgentBranches(agentId: string): Promise<number>;
    twelveMonthProfitForAgentBranches(agentId: string): Promise<{
        month: string;
        profit: number;
    }[]>;
}

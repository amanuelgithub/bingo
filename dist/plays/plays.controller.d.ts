import { PlaysService } from './plays.service';
import { SellCardDto } from './dto/sell-card.dto';
import { Play } from './entities/play.entity';
export declare class PlaysController {
    private readonly playsService;
    constructor(playsService: PlaysService);
    sellCard(sellCardDto: SellCardDto): Promise<Play>;
    findUnsoldCards(branchId: string, gameId: string): Promise<any>;
    findGameSoldPlays(branchId: string, gameId: string): Promise<Play[]>;
    todayProfitForAllBranches(): Promise<number>;
    thisMonthProfitForAllBranches(): Promise<string>;
    thisYearProfitForAllBranches(): Promise<string>;
    twelveMonthProfitForAllBranches(): Promise<{
        month: string;
        profit: number;
    }[]>;
    totalProfitForAllBranches(): Promise<string>;
    todayProfitForAgentBranches(agentId: string): Promise<number>;
    thisMonthProfitsForAgentBranches(agentId: string): Promise<number>;
    thisYearProfitsForAgentBranches(agentId: string): Promise<number>;
    totalProfitsForAgentBranches(agentId: string): Promise<number>;
    twelveMonthProfitsForAgentBranches(agentId: string): Promise<{
        month: string;
        profit: number;
    }[]>;
}

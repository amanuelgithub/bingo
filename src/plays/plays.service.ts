import { ConflictException, Injectable } from '@nestjs/common';
import { SellCardDto } from './dto/sell-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardStateEnum, Play } from './entities/play.entity';
import { Repository } from 'typeorm';
import { CardsService } from 'src/cards/cards.service';
import {
  startOfToday,
  endOfToday,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { AgentsService } from 'src/agents/agents.service';

@Injectable()
export class PlaysService {
  constructor(
    @InjectRepository(Play) private playsRepository: Repository<Play>,
    private cardsService: CardsService,
    private agentsService: AgentsService,
  ) {}

  // find unsold cards
  async findUnsoldCards(branchId: string, gameId: string) {
    const plays = await this.playsRepository.find({ where: { gameId } });
    const branchCards = this.cardsService.findBranchCards(undefined, branchId);

    const unsoldCards = branchCards.cards.filter((card) => {
      if (plays.length === 0) {
        return true;
      }

      if (plays.find((play) => play.cardId === card.cardId)) {
        return false;
      }

      return true;
    });

    return unsoldCards;
  }

  /** returns all plays info for the selected branchId and gameId */
  async findGameSoldPlays(branchId: string, gameId: string) {
    const plays = await this.playsRepository
      .createQueryBuilder('play')
      .andWhere('play.branchId = :branchId', { branchId })
      .andWhere('play.gameId = :gameId', { gameId })
      .getMany();

    return plays;
  }

  async sellCard(sellCardDto: SellCardDto) {
    const { gameId, cardId, branchId, cashierId, money } = sellCardDto;
    // check if card is sold for a specific cashier
    const card = await this.playsRepository
      .createQueryBuilder('play')
      .where('play.gameId = :gameId', { gameId })
      .andWhere('play.cardId = :cardId', { cardId })
      .getOne();

    if (card) {
      throw new ConflictException('Card is already sold');
    }

    const sellCard = this.playsRepository.create({
      ...sellCardDto,
      cardState: CardStateEnum.NORMAL,
    });
    return await this.playsRepository.save(sellCard);
  }

  // cashiers queries
  async findDueCashForCashier(cashierId: string, lastCheckoutDate: Date) {
    let totalSaleSinceLastCheckout = 0;

    await this.playsRepository
      .createQueryBuilder('play')
      .where('play.cashierId = :cashierId', { cashierId })
      .andWhere('play.createdAt >= :lastCheckoutDate', { lastCheckoutDate })
      .andWhere('play.createdAt <= :currentDate', { currentDate: new Date() })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          console.log('play:', play);
          totalSaleSinceLastCheckout += play.money;
        });
      });

    const dueCash = totalSaleSinceLastCheckout * 0.2;
    return parseInt(dueCash.toFixed(2));
  }

  // super-admin reports //

  // find today's profit in all branches
  async todayProfitForAllBranches() {
    let todayProfits = 0;

    await this.playsRepository
      .createQueryBuilder('play')
      .where('play.createdAt >= :startOfToday', {
        startOfToday: startOfToday(),
      })
      .andWhere('play.createdAt <= :endOfToday', { endOfToday: endOfToday() })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          todayProfits += play.money;
        });
      });

    return parseInt((todayProfits * 0.2).toFixed(2));
  }

  // find this month's profits in all branches
  async thisMonthProfitForAllBranches() {
    let thisMonthProfits = 0;

    await this.playsRepository
      .createQueryBuilder('play')
      .where('play.createdAt >= :startOfMonth', {
        startOfMonth: startOfMonth(new Date()),
      })
      .andWhere('play.createdAt <= :endOfMonth', {
        endOfMonth: endOfMonth(new Date()),
      })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          thisMonthProfits += play.money;
        });
      });

    return (thisMonthProfits * 0.2).toFixed(2);
  }

  async thisYearProfitForAllBranches() {
    let thisYearProfit = 0;

    await this.playsRepository
      .createQueryBuilder('play')
      .where('play.createdAt >= :startOfYear', {
        startOfYear: startOfYear(new Date()),
      })
      .andWhere('play.createdAt <= :endOfYear', {
        endOfYear: endOfYear(new Date()),
      })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          thisYearProfit += play.money;
        });
      });

    return (thisYearProfit * 0.2).toFixed(2);
  }

  async totalProfitForAllBranches() {
    let totalProfit = 0;

    await this.playsRepository
      .createQueryBuilder('play')
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          totalProfit += play.money;
        });
      });

    return (totalProfit * 0.2).toFixed(2);
  }

  async twelveMonthProfitForAllBranches() {
    const year = new Date().getFullYear();

    const dataset = [
      { month: 'January', profit: 0 },
      { month: 'February', profit: 0 },
      { month: 'March', profit: 0 },
      { month: 'April', profit: 0 },
      { month: 'May', profit: 0 },
      { month: 'June', profit: 0 },
      { month: 'July', profit: 0 },
      { month: 'August', profit: 0 },
      { month: 'September', profit: 0 },
      { month: 'October', profit: 0 },
      { month: 'November', profit: 0 },
      { month: 'December', profit: 0 },
    ];

    for (let i = 0; i < 12; i++) {
      let thisMonthProfits = 0;

      await this.playsRepository
        .createQueryBuilder('play')
        .where('play.createdAt >= :startOfMonth', {
          startOfMonth: startOfMonth(new Date(year, i)),
        })
        .andWhere('play.createdAt <= :endOfMonth', {
          endOfMonth: endOfMonth(new Date(year, i)),
        })
        .select('play.money')
        .getMany()
        .then((plays) => {
          plays.map((play) => {
            thisMonthProfits += play.money;
          });
        });

      thisMonthProfits = thisMonthProfits * 0.2;

      dataset[i].profit = parseInt(thisMonthProfits.toFixed(2));
    }

    return dataset;
  }

  // agent reports //

  // find today's profit in all branches for agent
  async todayProfitForAgentBranches(agentId: string) {
    let todayProfits = 0;

    const agentBranches = await this.agentsService.findAgentBranches(agentId);

    await this.playsRepository
      .createQueryBuilder('play')
      .where('play.createdAt >= :startOfToday', {
        startOfToday: startOfToday(),
      })
      .andWhere('play.createdAt <= :endOfToday', { endOfToday: endOfToday() })
      .andWhere('play.branchId IN (:branchIds)', {
        branchIds: agentBranches.branches.map((b) => b.id),
      })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          console.log('play: ', play);
          todayProfits += play.money;
        });
      });

    console.log('todayProfitsForAgentBranches: ', todayProfits * 0.2);

    return parseInt((todayProfits * 0.2).toFixed(2));
  }

  // find this month's profits in all branches for agent
  async thisMonthProfitsForAgentBranches(agentId: string) {
    let thisMonthProfits = 0;

    const agentBranches = await this.agentsService.findAgentBranches(agentId);

    await this.playsRepository
      .createQueryBuilder('play')
      .where('play.createdAt >= :startOfMonth', {
        startOfMonth: startOfMonth(new Date()),
      })
      .andWhere('play.createdAt <= :endOfMonth', {
        endOfMonth: endOfMonth(new Date()),
      })
      .andWhere('play.branchId IN (:branchIds)', {
        branchIds: agentBranches.branches.map((b) => b.id),
      })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          thisMonthProfits += play.money;
        });
      });

    return parseInt((thisMonthProfits * 0.2).toFixed(2));
  }

  // find total profit in all branches for agent
  async totalProfitsForAgentBranches(agentId: string) {
    let totalProfits = 0;

    const agentBranches = await this.agentsService.findAgentBranches(agentId);

    await this.playsRepository
      .createQueryBuilder('play')
      .andWhere('play.branchId IN (:branchIds)', {
        branchIds: agentBranches.branches.map((b) => b.id),
      })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          totalProfits += play.money;
        });
      });

    return parseInt((totalProfits * 0.2).toFixed(2));
  }

  async thisYearProfitForAgentBranches(agentId: string) {
    const agentBranches = await this.agentsService.findAgentBranches(agentId);

    let thisYearProfit = 0;

    await this.playsRepository
      .createQueryBuilder('play')
      .where('play.createdAt >= :startOfYear', {
        startOfYear: startOfYear(new Date()),
      })
      .andWhere('play.createdAt <= :endOfYear', {
        endOfYear: endOfYear(new Date()),
      })
      .andWhere('play.branchId IN (:branchIds)', {
        branchIds: agentBranches.branches.map((b) => b.id),
      })
      .select('play.money')
      .getMany()
      .then((plays) => {
        plays.map((play) => {
          thisYearProfit += play.money;
        });
      });

    return parseInt((thisYearProfit * 0.2).toFixed(2));
  }

  // find all the twelve month profits for all branches of an agent
  async twelveMonthProfitForAgentBranches(agentId: string) {
    const agentBranches = await this.agentsService.findAgentBranches(agentId);

    const dataset = [
      { month: 'January', profit: 0 },
      { month: 'February', profit: 0 },
      { month: 'March', profit: 0 },
      { month: 'April', profit: 0 },
      { month: 'May', profit: 0 },
      { month: 'June', profit: 0 },
      { month: 'July', profit: 0 },
      { month: 'August', profit: 0 },
      { month: 'September', profit: 0 },
      { month: 'October', profit: 0 },
      { month: 'November', profit: 0 },
      { month: 'December', profit: 0 },
    ];

    const year = new Date().getFullYear();

    for (let i = 0; i < 12; i++) {
      let thisMonthProfits = 0;

      await this.playsRepository
        .createQueryBuilder('play')
        .where('play.createdAt >= :startOfMonth', {
          startOfMonth: startOfMonth(new Date(year, i)),
        })
        .andWhere('play.createdAt <= :endOfMonth', {
          endOfMonth: endOfMonth(new Date(year, i)),
        })
        .andWhere('play.branchId IN (:branchIds)', {
          branchIds: agentBranches.branches.map((b) => b.id),
        })
        .select('play.money')
        .getMany()
        .then((plays) => {
          plays.map((play) => {
            thisMonthProfits += play.money;
          });
        });

      thisMonthProfits = thisMonthProfits * 0.2;

      dataset[i].profit = parseInt(thisMonthProfits.toFixed(2));
    }

    return dataset;
  }
}

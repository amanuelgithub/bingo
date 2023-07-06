"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const play_entity_1 = require("./entities/play.entity");
const typeorm_2 = require("typeorm");
const cards_service_1 = require("../cards/cards.service");
const date_fns_1 = require("date-fns");
const agents_service_1 = require("../agents/agents.service");
let PlaysService = class PlaysService {
    constructor(playsRepository, cardsService, agentsService) {
        this.playsRepository = playsRepository;
        this.cardsService = cardsService;
        this.agentsService = agentsService;
    }
    async findUnsoldCards(branchId, gameId) {
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
    async findGameSoldPlays(branchId, gameId) {
        const plays = await this.playsRepository
            .createQueryBuilder('play')
            .andWhere('play.branchId = :branchId', { branchId })
            .andWhere('play.gameId = :gameId', { gameId })
            .getMany();
        return plays;
    }
    async sellCard(sellCardDto) {
        const { gameId, cardId, branchId, cashierId, money } = sellCardDto;
        const card = await this.playsRepository
            .createQueryBuilder('play')
            .where('play.gameId = :gameId', { gameId })
            .andWhere('play.cardId = :cardId', { cardId })
            .getOne();
        if (card) {
            throw new common_1.ConflictException('Card is already sold');
        }
        const sellCard = this.playsRepository.create(Object.assign(Object.assign({}, sellCardDto), { cardState: play_entity_1.CardStateEnum.NORMAL }));
        return await this.playsRepository.save(sellCard);
    }
    async findDueCashForCashier(cashierId, lastCheckoutDate) {
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
    async todayProfitForAllBranches() {
        let todayProfits = 0;
        await this.playsRepository
            .createQueryBuilder('play')
            .where('play.createdAt >= :startOfToday', {
            startOfToday: (0, date_fns_1.startOfToday)(),
        })
            .andWhere('play.createdAt <= :endOfToday', { endOfToday: (0, date_fns_1.endOfToday)() })
            .select('play.money')
            .getMany()
            .then((plays) => {
            plays.map((play) => {
                todayProfits += play.money;
            });
        });
        return parseInt((todayProfits * 0.2).toFixed(2));
    }
    async thisMonthProfitForAllBranches() {
        let thisMonthProfits = 0;
        await this.playsRepository
            .createQueryBuilder('play')
            .where('play.createdAt >= :startOfMonth', {
            startOfMonth: (0, date_fns_1.startOfMonth)(new Date()),
        })
            .andWhere('play.createdAt <= :endOfMonth', {
            endOfMonth: (0, date_fns_1.endOfMonth)(new Date()),
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
            startOfYear: (0, date_fns_1.startOfYear)(new Date()),
        })
            .andWhere('play.createdAt <= :endOfYear', {
            endOfYear: (0, date_fns_1.endOfYear)(new Date()),
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
                startOfMonth: (0, date_fns_1.startOfMonth)(new Date(year, i)),
            })
                .andWhere('play.createdAt <= :endOfMonth', {
                endOfMonth: (0, date_fns_1.endOfMonth)(new Date(year, i)),
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
    async todayProfitForAgentBranches(agentId) {
        let todayProfits = 0;
        const agentBranches = await this.agentsService.findAgentBranches(agentId);
        await this.playsRepository
            .createQueryBuilder('play')
            .where('play.createdAt >= :startOfToday', {
            startOfToday: (0, date_fns_1.startOfToday)(),
        })
            .andWhere('play.createdAt <= :endOfToday', { endOfToday: (0, date_fns_1.endOfToday)() })
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
    async thisMonthProfitsForAgentBranches(agentId) {
        let thisMonthProfits = 0;
        const agentBranches = await this.agentsService.findAgentBranches(agentId);
        await this.playsRepository
            .createQueryBuilder('play')
            .where('play.createdAt >= :startOfMonth', {
            startOfMonth: (0, date_fns_1.startOfMonth)(new Date()),
        })
            .andWhere('play.createdAt <= :endOfMonth', {
            endOfMonth: (0, date_fns_1.endOfMonth)(new Date()),
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
    async totalProfitsForAgentBranches(agentId) {
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
    async thisYearProfitForAgentBranches(agentId) {
        const agentBranches = await this.agentsService.findAgentBranches(agentId);
        let thisYearProfit = 0;
        await this.playsRepository
            .createQueryBuilder('play')
            .where('play.createdAt >= :startOfYear', {
            startOfYear: (0, date_fns_1.startOfYear)(new Date()),
        })
            .andWhere('play.createdAt <= :endOfYear', {
            endOfYear: (0, date_fns_1.endOfYear)(new Date()),
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
    async twelveMonthProfitForAgentBranches(agentId) {
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
                startOfMonth: (0, date_fns_1.startOfMonth)(new Date(year, i)),
            })
                .andWhere('play.createdAt <= :endOfMonth', {
                endOfMonth: (0, date_fns_1.endOfMonth)(new Date(year, i)),
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
};
PlaysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(play_entity_1.Play)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        cards_service_1.CardsService,
        agents_service_1.AgentsService])
], PlaysService);
exports.PlaysService = PlaysService;
//# sourceMappingURL=plays.service.js.map
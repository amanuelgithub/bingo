import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { SellCardDto } from './dto/sell-card.dto';
import { Play } from './entities/play.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Post()
  sellCard(@Body() sellCardDto: SellCardDto) {
    return this.playsService.sellCard(sellCardDto);
  }

  @Get('/unsold-cards/:branchId/:gameId')
  findUnsoldCards(
    @Param('branchId') branchId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.playsService.findUnsoldCards(branchId, gameId);
  }

  @Get('/game-plays/:branchId/:gameId')
  findGameSoldPlays(
    @Param('branchId') branchId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.playsService.findGameSoldPlays(branchId, gameId);
  }

  // super-admin reports //
  @Get('/admin-profit/today')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  todayProfitForAllBranches() {
    return this.playsService.todayProfitForAllBranches();
  }

  @Get('/admin-profit/this-month')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  thisMonthProfitForAllBranches() {
    return this.playsService.thisMonthProfitForAllBranches();
  }

  @Get('/admin-profit/this-year')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  thisYearProfitForAllBranches() {
    return this.playsService.thisYearProfitForAllBranches();
  }

  @Get('/admin-profit/twelve-month-report')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  twelveMonthProfitForAllBranches() {
    return this.playsService.twelveMonthProfitForAllBranches();
  }

  @Get('/admin-profit/total')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  totalProfitForAllBranches() {
    return this.playsService.totalProfitForAllBranches();
  }

  // agent reports //
  @Get('/agent-profit/:agentId/today')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  todayProfitForAgentBranches(@Param('agentId') agentId: string) {
    return this.playsService.todayProfitForAgentBranches(agentId);
  }

  @Get('/agent-profit/:agentId/this-month')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  thisMonthProfitsForAgentBranches(@Param('agentId') agentId: string) {
    return this.playsService.thisMonthProfitsForAgentBranches(agentId);
  }

  @Get('/agent-profit/:agentId/this-year')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  thisYearProfitsForAgentBranches(@Param('agentId') agentId: string) {
    return this.playsService.thisYearProfitForAgentBranches(agentId);
  }

  @Get('/agent-profit/:agentId/total')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  totalProfitsForAgentBranches(@Param('agentId') agentId: string) {
    return this.playsService.totalProfitsForAgentBranches(agentId);
  }

  @Get('/agent-profit/:agentId/twelve-month-report')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Play))
  twelveMonthProfitsForAgentBranches(@Param('agentId') agentId: string) {
    return this.playsService.twelveMonthProfitForAgentBranches(agentId);
  }
}

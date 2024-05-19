import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CashiersService } from './cashiers.service';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { CheckPolicies } from '../casl/check-policy.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { Action, AppAbility } from '../casl/casl-ability.factory';
import { Cashier } from './entities/cashier.entity';

@Controller('cashiers')
export class CashiersController {
  constructor(private readonly cashiersService: CashiersService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Cashier))
  register(@Body() createCashierDto: CreateCashierDto) {
    return this.cashiersService.create(createCashierDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Cashier))
  findOne(@Param('id') id: string) {
    return this.cashiersService.findOne(id);
  }

  @Get('/branch/:branchId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Cashier))
  findBranchCashiers(@Param('branchId') branchId: string) {
    return this.cashiersService.findBranchCashiers(branchId);
  }

  @Get('/agent-branches/:agentId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Cashier))
  findAgentCashiers(@Param('agentId') agentId: string) {
    return this.cashiersService.findAgentCashiers(agentId);
  }

  @Get('/cash-book/:cashierId/:branchId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Cashier))
  findCashierCashBook(
    @Param('cashierId') cashierId: string,
    @Param('branchId') branchId: string,
  ) {
    return this.cashiersService.findCashierCashBook(cashierId, branchId);
  }

  @Patch('/clear-cash-book/:cashierId/:branchId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Cashier))
  clearCashierCashBook(
    @Param('cashierId') cashierId: string,
    @Param('branchId') branchId: string,
  ) {
    return this.cashiersService.clearCashierCashBook(cashierId, branchId);
  }
}

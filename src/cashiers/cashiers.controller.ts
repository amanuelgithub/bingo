import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CashiersService } from './cashiers.service';
import { CreateCashierDto } from './dto/create-cashier.dto';
import { UpdateCashierDto } from './dto/update-cashier.dto';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
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

  @Get()
  @UseGuards(JwtAuthGuard)
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Cashier))
  findAll() {
    return this.cashiersService.findAll();
  }

  /** 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashiersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashierDto: UpdateCashierDto) {
    return this.cashiersService.update(+id, updateCashierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashiersService.remove(+id);
  }
  */
}

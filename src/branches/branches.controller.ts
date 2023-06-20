import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/casl/policies.guard';
import { CheckPolicies } from 'src/casl/check-policy.decorator';
import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { Branch } from './entities/branch.entity';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Branch))
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Branch))
  findAll(@Req() req) {
    return this.branchesService.findAll();
  }
}

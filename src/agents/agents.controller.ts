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
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { CheckPolicies } from '../casl/check-policy.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { Action, AppAbility } from '../casl/casl-ability.factory';
import { Agent } from './entities/agent.entity';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Agent))
  register(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Agent))
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Agent))
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(id);
  }

  @Patch('/add-branch/:agentId/:branchId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Agent))
  addBranchToAgent(
    @Param('agentId') agentId: string,
    @Param('branchId') branchId: string,
  ) {
    return this.agentsService.addBranchToAgent(agentId, branchId);
  }
}

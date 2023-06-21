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
import { UpdateAgentDto } from './dto/update-agent.dto';
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

  /** 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }

*/
}

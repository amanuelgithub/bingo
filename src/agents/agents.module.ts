import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { BranchesModule } from '../branches/branches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { User } from '../users/entities/user.entity';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, User]),
    CaslModule,
    BranchesModule,
  ],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}

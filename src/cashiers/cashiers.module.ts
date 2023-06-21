import { Module } from '@nestjs/common';
import { CashiersService } from './cashiers.service';
import { CashiersController } from './cashiers.controller';
import { BranchesModule } from '../branches/branches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './entities/cashier.entity';
import { User } from '../users/entities/user.entity';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cashier, User]),
    CaslModule,
    BranchesModule,
  ],
  controllers: [CashiersController],
  providers: [CashiersService],
})
export class CashiersModule {}

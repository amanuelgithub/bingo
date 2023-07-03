import { Module } from '@nestjs/common';
import { CashiersService } from './cashiers.service';
import { CashiersController } from './cashiers.controller';
import { BranchesModule } from '../branches/branches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './entities/cashier.entity';
import { User } from '../users/entities/user.entity';
import { CaslModule } from '../casl/casl.module';
import { UsersModule } from 'src/users/users.module';
import { PlaysModule } from 'src/plays/plays.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cashier, User]),
    CaslModule,
    BranchesModule,
    PlaysModule,
  ],
  controllers: [CashiersController],
  providers: [CashiersService],
})
export class CashiersModule {}

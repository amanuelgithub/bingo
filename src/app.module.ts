import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { appConfig } from './config/app.config';
import { validationSchema } from './config/env.validation';
import { DB_CONFIG } from './commons/constants';
import { UsersModule } from './users/users.module';
import { AgentsModule } from './agents/agents.module';
import { CashiersModule } from './cashiers/cashiers.module';
import { BranchesModule } from './branches/branches.module';
import { GamesModule } from './games/games.module';
import { PlaysModule } from './plays/plays.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { CardsModule } from './cards/cards.module';
import { CardsService } from './cards/cards.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      load: Object.values([DatabaseConfig, appConfig]),
      validationSchema: validationSchema,
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get(DB_CONFIG),
      }),
    }),

    EventEmitterModule.forRoot(),

    UsersModule,

    AgentsModule,

    CashiersModule,

    BranchesModule,

    GamesModule,

    PlaysModule,

    AuthModule,

    CaslModule,

    CardsModule,
  ],
})
export class AppModule {
  constructor(private cardsService: CardsService) {
    // create `cards.json` file
    cardsService.createJSONFile();
  }
}

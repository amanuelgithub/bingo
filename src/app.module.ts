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
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './users/entities/user.entity';
import { Agent } from './agents/entities/agent.entity';
import { Cashier } from './cashiers/entities/cashier.entity';
import { Branch } from './branches/entities/branch.entity';
import { Game } from './games/entities/game.entity';
import { Play } from './plays/entities/play.entity';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   // currently not in use because environment_variables does not work on cpanel
    //   envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    //   // below are used
    //   load: Object.values([DatabaseConfig, appConfig]),
    //   validationSchema: validationSchema,
    //   isGlobal: true,
    // }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     ...configService.get(DB_CONFIG),
    //   }),
    // }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,

      database: 'bingo',
      username: 'root',
      password: '',
      // password: 'password',

      // database: 'amanuelgirmadev_bingo',
      // username: 'amanuelgirmadev_amanuelgirmadev',
      // password: 'L4hH8tO1lS0aA6d',

      // ssl: {
      //   rejectUnauthorized: false,
      // },
      entities: [User, Agent, Cashier, Branch, Game, Play],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    ScheduleModule.forRoot(),

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

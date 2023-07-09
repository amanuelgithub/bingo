import { registerAs } from '@nestjs/config';
import { DATABASE_NAME, DB_CONFIG } from '../commons/constants';
import { DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';
import { User } from 'src/users/entities/user.entity';
import { Agent } from 'src/agents/entities/agent.entity';
import { Cashier } from 'src/cashiers/entities/cashier.entity';
import { Branch } from 'src/branches/entities/branch.entity';
import { Game } from 'src/games/entities/game.entity';
import { Play } from 'src/plays/entities/play.entity';

dotenv.config({ path: `${process.cwd()}/src/env/${process.env.NODE_ENV}.env` });

// const postgresqlDataSourceOption: DataSourceOptions = {
//   url: process.env.DATABASE_URL,
//   type: 'postgres',
//   // host: process.env.DATABASE_HOST || 'localhost',
//   // port: process.env.DATABASE_PORT || 5432,
//   database: process.env.DATABASE_NAME || 'ethio_tutora',
//   // username: process.env.DATABASE_USER || 'postgres',
//   // password: process.env.DATABASE_PASSWORD || 'password',
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   // entities: [User, Tutor, Client, WeeklyAvailability, Subject, Booking, Admin],
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   autoLoadEntities: true,
//   synchronize: true,
// } as DataSourceOptions;

const postgresqlDataSourceOption: DataSourceOptions = {
  // url: process.env.DATABASE_URL,
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  database: process.env.DATABASE_NAME || 'bingo',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',

  // ssl: {
  //   rejectUnauthorized: false,
  // },
  entities: [User, Agent, Cashier, Branch, Game, Play],
  // entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
} as DataSourceOptions;

export const DatabaseConfig = registerAs<DataSourceOptions>(DB_CONFIG, () => {
  return postgresqlDataSourceOption;
});

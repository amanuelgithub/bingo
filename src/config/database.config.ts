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

// const postgresqlDataSourceOption: DataSourceOptions = {
//   // url: process.env.DATABASE_URL,
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   database: 'bingo',
//   username: process.env.DATABASE_USER || 'postgres',
//   password: process.env.DATABASE_PASSWORD || 'password',
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
//   // entities: [User, Tutor, Client, WeeklyAvailability, Subject, Booking, Admin],
//   entities: ['dist/**/*.entity{.ts,.js}'],
//   autoLoadEntities: true,
//   synchronize: true,
// } as DataSourceOptions;

const postgresqlDataSourceOption: DataSourceOptions = {
  // url: process.env.DATABASE_URL,
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,

  database: 'bingo',
  username: 'root',
  password: '',

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
} as DataSourceOptions;

// const postgresqlDataSourceOption: DataSourceOptions = {
//   // url: process.env.DATABASE_URL,
//   type: 'postgres',
//   host: '127.0.0.1',
//   port: 5432,

//   database: 'bingo',
//   username: 'postgres',
//   password: 'postgres',

//   // database: 'amanuelgirmadev_bingo',
//   // username: 'amanuelgirmadev_amanuelgirmadev',
//   // password: 'L4hH8tO1lS0aA6d',

//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
//   entities: [User, Agent, Cashier, Branch, Game, Play],
//   // entities: ['dist/**/*.entity{.ts,.js}'],
//   autoLoadEntities: true,
//   synchronize: true,
// } as DataSourceOptions;

// previously used sqlite database configuration
const sqliteDataSourceOption: DataSourceOptions = {
  type: 'sqlite',
  database: process.env.BINGO_DB_NAME || DATABASE_NAME,
  // entities: [User, WeeklyAvailability, Subject, Booking],
  // replaced with `autoLoadEntities: true` to automatically import all the entities
  logging: true,
  migrationsRun: true,
  synchronize: true,
  // autoLoadEntities: true,
} as DataSourceOptions;

export const DatabaseConfig = registerAs<DataSourceOptions>(DB_CONFIG, () => {
  return postgresqlDataSourceOption;
});

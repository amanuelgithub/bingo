import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Response,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CheckPolicies } from '../casl/check-policy.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PoliciesGuard } from '../casl/policies.guard';
import { Action, AppAbility } from '../casl/casl-ability.factory';
import { Game } from './entities/game.entity';
import { join } from 'path';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Game))
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  // returns an active by a specific cashierId
  @Get('/active/:cashierId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Game))
  getActiveGameByCashier(@Param('cashierId') cashierId: string) {
    return this.gamesService.getActiveGameByCashier(cashierId);
  }

  @Patch('/end-game/:gameId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Game))
  updateGame(@Param('gameId') gameId: string) {
    return this.gamesService.updateGameState(gameId);
  }

  @Get('/balls-audio/:lang/:audioname')
  getSound(
    @Param('lang') lang: 'am' | 'or' | string,
    @Param('audioname') audioname: string,
    @Response() res,
  ) {
    console.log('lang: ', lang);
    console.log('audioname: ', audioname);
    if (lang === 'am') {
      return res.sendFile(join(process.cwd(), '_sounds/am/' + audioname));
    } else if (lang === 'or') {
      return res.sendFile(join(process.cwd(), '_sounds/or/' + audioname));
    } else {
      return res.sendFile(join(process.cwd(), '_sounds/am/' + audioname));
    }
  }
}

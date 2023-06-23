import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaysService } from './plays.service';
import { CreatePlayDto } from './dto/create-play.dto';
import { UpdatePlayDto } from './dto/update-play.dto';
import { SellCardDto } from './dto/sell-card.dto';

@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  @Post()
  sellCard(@Body() sellCardDto: SellCardDto) {
    return this.playsService.sellCard(sellCardDto);
  }

  @Get('/unsold-cards/:branchId/:gameId')
  findUnsoldCards(
    @Param('branchId') branchId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.playsService.findUnsoldCards(branchId, gameId);
  }

  @Get('/game-plays/:branchId/:gameId')
  findGameSoldPlays(
    @Param('branchId') branchId: string,
    @Param('gameId') gameId: string,
  ) {
    return this.playsService.findGameSoldPlays(branchId, gameId);
  }

  @Get()
  findAll() {
    return this.playsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayDto: UpdatePlayDto) {
    return this.playsService.update(+id, updatePlayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playsService.remove(+id);
  }
}

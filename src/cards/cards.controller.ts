import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  register(@Req() req, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.registerCardOfBranch(req.user, createCardDto);
  }

  @Get('/branch/:branchId')
  @UseGuards(JwtAuthGuard)
  findBranchCards(@Req() req, @Param('branchId') branchId: string) {
    console.log('found card barnchId; ', branchId);
    return this.cardsService.findBranchCards(req.user, branchId);
  }

  // expects a query-params like following one:
  // /cards?cardId=123&branchId=123
  @Get()
  @UseGuards(JwtAuthGuard)
  findCard(
    @Req() req,
    @Query('branchId') branchId: string,
    @Query('cardId') cardId: string,
  ) {
    return this.cardsService.findCard(req.user, branchId, cardId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req,
    @Query('branchId') branchId: string,
    @Query('cardId') cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.cardsService.updateCard(
      req.user,
      branchId,
      cardId,
      updateCardDto,
    );
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteCard(
    @Req() req,
    @Query('branchId') branchId: string,
    @Query('cardId') cardId: string,
  ) {
    return this.cardsService.deleteCard(req.user, branchId, cardId);
  }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { UpdatePlayDto } from './dto/update-play.dto';
import { SellCardDto } from './dto/sell-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CardStateEnum, Play } from './entities/play.entity';
import { Repository } from 'typeorm';
import { CardsService } from 'src/cards/cards.service';

@Injectable()
export class PlaysService {
  constructor(
    @InjectRepository(Play) private playsRepository: Repository<Play>,
    private cardsService: CardsService,
  ) {}

  // find unsold cards
  async findUnsoldCards(branchId: string, gameId: string) {
    const plays = await this.playsRepository.find({ where: { gameId } });
    const branchCards = this.cardsService.findBranchCards(undefined, branchId);

    const unsoldCards = branchCards.cards.filter((card) => {
      if (plays.length === 0) {
        return true;
      }

      if (plays.find((play) => play.cardId === card.cardId)) {
        return false;
      }

      return true;
    });

    return unsoldCards;
  }

  /** returns all plays info for the selected branchId and gameId */
  async findGameSoldPlays(branchId: string, gameId: string) {
    const plays = await this.playsRepository
      .createQueryBuilder('play')
      .andWhere('play.branchId = :branchId', { branchId })
      .andWhere('play.gameId = :gameId', { gameId })
      .getMany();

    return plays;
  }

  async sellCard(sellCardDto: SellCardDto) {
    const { gameId, cardId, branchId, cashierId, money } = sellCardDto;
    // check if card is sold for a specific cashier
    const card = await this.playsRepository
      .createQueryBuilder('play')
      .where('play.gameId = :gameId', { gameId })
      .andWhere('play.cardId = :cardId', { cardId })
      .getOne();

    if (card) {
      throw new ConflictException('Card is already sold');
    }

    const sellCard = this.playsRepository.create({
      ...sellCardDto,
      cardState: CardStateEnum.NORMAL,
    });
    return await this.playsRepository.save(sellCard);
  }

  findAll() {
    return `This action returns all plays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} play`;
  }

  update(id: number, updatePlayDto: UpdatePlayDto) {
    return `This action updates a #${id} play`;
  }

  remove(id: number) {
    return `This action removes a #${id} play`;
  }
}

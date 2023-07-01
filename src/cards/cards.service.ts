import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { BranchCreatedEvent } from '../branches/events/branch-created.event';
import { IdGenerator } from '../utils/id-generater';

// format of cards.json
// {
//   'branch_1': {
//     cards: [
//       {
//         cardId: `CRD-0001-${branchId}`,
//         numbers: [
//           [1, 2, 3, 4, 5],
//           [1, 2, 3, 4, 5],
//           [1, 2, 3, 4, 5],
//           [1, 2, 3, 4, 5],
//           [1, 2, 3, 4, 5],
//         ],
//       },
//     ],
//   },
// }

const initialCards = {};

// These just works on JSON file
@Injectable()
export class CardsService {
  // stores all cards for all branches
  private readonly CARDS_JSON_NAME = 'cards.json';
  private idGenerator: IdGenerator;

  constructor() {
    this.idGenerator = new IdGenerator();
  }

  // create json file
  createJSONFile() {
    // Check if the file exists
    if (fs.existsSync(this.CARDS_JSON_NAME)) {
      console.log(
        `${this.CARDS_JSON_NAME} already exists. Aborting creation process.`,
      );
    } else {
      fs.writeFile(
        this.CARDS_JSON_NAME,
        JSON.stringify(initialCards),
        (err) => {
          if (err) {
            console.error(`Error creating ${this.CARDS_JSON_NAME} file:`, err);
          } else {
            console.log(`${this.CARDS_JSON_NAME} created successfully.`);
          }
        },
      );
    }
  }

  // method called when a branch is created
  // stores {'branch_id: {cards: []}} to the cards.json
  @OnEvent('branch.created')
  registerBranchOnJSON(payload: BranchCreatedEvent) {
    const { branchId } = payload;
    const branchCards = { cards: [] };

    try {
      const cards = this.getCards();

      cards[branchId] = branchCards;

      fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(cards));
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // register-card
  registerCardOfBranch(requestingUser: any, createCardDto: CreateCardDto) {
    const { branchId, numbers } = createCardDto;

    try {
      const allCards = this.getCards();
      const branchCards = allCards[branchId];

      // get last-card-index
      let lastCardIndex;
      if (branchCards.cards.length > 0) {
        lastCardIndex = branchCards.cards[branchCards.cards.length - 1].cardId
          .toString()
          .split('-')[1]
          .split('')
          .map((ch) => parseInt(ch))
          .filter((ch) => ch !== 0)
          .join('');
      } else {
        lastCardIndex = '0';
      }

      // generate id
      const cardId = this.idGenerator.generateId(parseInt(lastCardIndex));
      const card = { cardId, numbers };

      branchCards.cards.push(card);

      // write to the file system
      fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(allCards));

      return {
        statusCode: HttpStatus.CREATED,
        message: 'card added successfully',
      };
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // find-single-card
  findCard(requestingUser: any, branchId: string, cardId: string) {
    try {
      const allCards = this.getCards();
      const branchCards = allCards[branchId];

      const foundCard = branchCards.cards.find(
        (card) => card.cardId === cardId,
      );

      return foundCard;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // find-all-branch-cards
  findBranchCards(requestingUser: any, branchId: string) {
    try {
      const allCards = this.getCards();
      const branchCards = allCards[branchId];

      return branchCards;
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // update-card
  updateCard(
    requestingUser: any,
    branchId: string,
    cardId: string,
    updateCardDto: UpdateCardDto,
  ) {
    const { numbers } = updateCardDto;

    try {
      const allCards = this.getCards();
      let branchCards = allCards[branchId];

      const foundCard = branchCards.cards.find(
        (card) => card.cardId === cardId,
      );

      if (!foundCard) {
        throw new NotFoundException('card not found!');
      } else {
        for (let i = 0; i < foundCard.numbers.length; i++) {
          const row = foundCard.numbers[i];
          for (let j = 0; j < row.length; j++) {
            foundCard.numbers[i][j] = numbers[i][j];
          }
        }

        branchCards = branchCards.cards.filter(
          (card) => card.cardId !== cardId,
        );

        branchCards.push(foundCard);

        // write to the file system
        fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(allCards));

        return {
          statusCode: HttpStatus.CREATED,
          message: 'card added successfully',
        };
      }
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // delete-card
  deleteCard(requestingUser: any, branchId: string, cardId: string) {
    try {
      const cards = this.getCards();
      let branchCards = cards[branchId];

      branchCards = branchCards.cards.filter((card) => {
        return card.cardId.toString() !== cardId;
      });

      cards[branchId] = { cards: branchCards };

      // write to the file system
      fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(cards));

      return {
        statusCode: HttpStatus.OK,
        message: 'card removed successfully',
      };
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  // below are utile functions //
  private getCards() {
    try {
      const cardsJSONData = fs.readFileSync(this.CARDS_JSON_NAME, 'utf8');
      const cards = JSON.parse(cardsJSONData);

      return cards;
    } catch (err) {
      console.log('Error: ', err);
    }
  }
}

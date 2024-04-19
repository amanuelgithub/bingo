"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const event_emitter_1 = require("@nestjs/event-emitter");
const branch_created_event_1 = require("../branches/events/branch-created.event");
const id_generater_1 = require("../utils/id-generater");
const initialCards = {};
let CardsService = class CardsService {
    constructor() {
        this.CARDS_JSON_NAME = 'cards.json';
        this.idGenerator = new id_generater_1.IdGenerator();
    }
    createJSONFile() {
        if (fs.existsSync(this.CARDS_JSON_NAME)) {
            console.log(`${this.CARDS_JSON_NAME} already exists. Aborting creation process.`);
        }
        else {
            fs.writeFile(this.CARDS_JSON_NAME, JSON.stringify(initialCards), (err) => {
                if (err) {
                    console.error(`Error creating ${this.CARDS_JSON_NAME} file:`, err);
                }
                else {
                    console.log(`${this.CARDS_JSON_NAME} created successfully.`);
                }
            });
        }
    }
    registerBranchOnJSON(payload) {
        const { branchId } = payload;
        const branchCards = { cards: [] };
        try {
            const cards = this.getCards();
            cards[branchId] = branchCards;
            fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(cards));
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    registerCardOfBranch(requestingUser, createCardDto) {
        const { branchId, numbers } = createCardDto;
        try {
            const allCards = this.getCards();
            const branchCards = allCards[branchId];
            let lastCardIndex;
            if (branchCards.cards.length > 0) {
                lastCardIndex = branchCards.cards[branchCards.cards.length - 1].cardId
                    .toString()
                    .split('-')[1]
                    .split('')
                    .map((ch) => parseInt(ch))
                    .filter((ch) => ch !== 0)
                    .join('');
            }
            else {
                lastCardIndex = '0';
            }
            const cardId = this.idGenerator.generateId(parseInt(lastCardIndex));
            const card = { cardId, numbers };
            branchCards.cards.push(card);
            fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(allCards));
            return {
                statusCode: common_1.HttpStatus.CREATED,
                message: 'card added successfully',
            };
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    findCard(requestingUser, branchId, cardId) {
        try {
            const allCards = this.getCards();
            const branchCards = allCards[branchId];
            const foundCard = branchCards.cards.find((card) => card.cardId === cardId);
            return foundCard;
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    findBranchCards(requestingUser, branchId) {
        try {
            const allCards = this.getCards();
            const branchCards = allCards[branchId];
            return branchCards;
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    updateCard(requestingUser, branchId, cardId, updateCardDto) {
        const { numbers } = updateCardDto;
        try {
            const allCards = this.getCards();
            let branchCards = allCards[branchId];
            const foundCard = branchCards.cards.find((card) => card.cardId === cardId);
            if (!foundCard) {
                throw new common_1.NotFoundException('card not found!');
            }
            else {
                for (let i = 0; i < foundCard.numbers.length; i++) {
                    const row = foundCard.numbers[i];
                    for (let j = 0; j < row.length; j++) {
                        foundCard.numbers[i][j] = numbers[i][j];
                    }
                }
                branchCards = branchCards.cards.filter((card) => card.cardId !== cardId);
                branchCards.push(foundCard);
                fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(allCards));
                return {
                    statusCode: common_1.HttpStatus.CREATED,
                    message: 'card added successfully',
                };
            }
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    deleteCard(requestingUser, branchId, cardId) {
        try {
            const cards = this.getCards();
            let branchCards = cards[branchId];
            branchCards = branchCards.cards.filter((card) => {
                return card.cardId.toString() !== cardId;
            });
            cards[branchId] = { cards: branchCards };
            fs.writeFileSync(this.CARDS_JSON_NAME, JSON.stringify(cards));
            return {
                statusCode: common_1.HttpStatus.OK,
                message: 'card removed successfully',
            };
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
    getCards() {
        try {
            const cardsJSONData = fs.readFileSync(this.CARDS_JSON_NAME, 'utf8');
            const cards = JSON.parse(cardsJSONData);
            return cards;
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }
};
exports.CardsService = CardsService;
__decorate([
    (0, event_emitter_1.OnEvent)('branch.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branch_created_event_1.BranchCreatedEvent]),
    __metadata("design:returntype", void 0)
], CardsService.prototype, "registerBranchOnJSON", null);
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CardsService);
//# sourceMappingURL=cards.service.js.map
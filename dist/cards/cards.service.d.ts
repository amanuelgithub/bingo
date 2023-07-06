import { HttpStatus } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { BranchCreatedEvent } from '../branches/events/branch-created.event';
export declare class CardsService {
    private readonly CARDS_JSON_NAME;
    private idGenerator;
    constructor();
    createJSONFile(): void;
    registerBranchOnJSON(payload: BranchCreatedEvent): void;
    registerCardOfBranch(requestingUser: any, createCardDto: CreateCardDto): {
        statusCode: HttpStatus;
        message: string;
    };
    findCard(requestingUser: any, branchId: string, cardId: string): any;
    findBranchCards(requestingUser: any, branchId: string): any;
    updateCard(requestingUser: any, branchId: string, cardId: string, updateCardDto: UpdateCardDto): {
        statusCode: HttpStatus;
        message: string;
    };
    deleteCard(requestingUser: any, branchId: string, cardId: string): {
        statusCode: HttpStatus;
        message: string;
    };
    private getCards;
}

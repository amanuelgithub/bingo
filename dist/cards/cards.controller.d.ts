import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    register(req: any, createCardDto: CreateCardDto): {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    };
    findBranchCards(req: any, branchId: string): any;
    findCard(req: any, branchId: string, cardId: string): any;
    update(req: any, branchId: string, cardId: string, updateCardDto: UpdateCardDto): {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    };
    deleteCard(req: any, branchId: string, cardId: string): {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    };
}

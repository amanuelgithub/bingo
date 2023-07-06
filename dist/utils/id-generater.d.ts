export declare class IdGenerator {
    private static instance;
    private id;
    private readonly CARD_PREFIX;
    constructor();
    static getInstance(): IdGenerator;
    generateId(lastCardIndex: number): string;
    private fancyCounter;
}

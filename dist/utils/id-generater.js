"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator = void 0;
class IdGenerator {
    constructor() {
        this.CARD_PREFIX = 'CRD';
        this.id = '';
    }
    static getInstance() {
        if (!IdGenerator.instance) {
            IdGenerator.instance = new IdGenerator();
        }
        return IdGenerator.instance;
    }
    generateId(lastCardIndex) {
        this.id = `${this.CARD_PREFIX}-${this.fancyCounter(lastCardIndex)}`;
        return this.id;
    }
    fancyCounter(index) {
        const fancyCounter = '00000';
        const counterDigitLen = index.toString().length;
        console.log('index: ', index);
        return `${fancyCounter.substring(0, fancyCounter.length - counterDigitLen)}${index + 1}`;
    }
}
exports.IdGenerator = IdGenerator;
//# sourceMappingURL=id-generater.js.map
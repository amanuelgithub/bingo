export class IdGenerator {
  private static instance: IdGenerator;
  private id: string;
  private readonly CARD_PREFIX = 'CRD';

  constructor() {
    this.id = '';
  }

  public static getInstance(): IdGenerator {
    if (!IdGenerator.instance) {
      IdGenerator.instance = new IdGenerator();
    }
    return IdGenerator.instance;
  }

  public generateId(branchId: string, lastIndex: number) {
    this.id = `${this.CARD_PREFIX}-${this.fancyCounter(lastIndex)}-${branchId}`;

    return this.id;
  }

  private fancyCounter(index: number) {
    const fancyCounter = '00000';
    const counterDigitLen = index.toString().length;

    console.log('index: ', index);

    return `${fancyCounter.substring(
      0,
      fancyCounter.length - counterDigitLen,
    )}${index}`;
  }
}

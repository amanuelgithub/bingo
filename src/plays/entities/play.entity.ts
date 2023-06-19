import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface IPlay {
  id: string;
  branchId: string;
  gameId: string;
  cardId: string;
  cashierId: string;
  money: string;
}

@Entity()
export class Play implements IPlay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  branchId: string;

  @Column()
  gameId: string;

  @Column()
  cardId: string;

  @Column()
  cashierId: string;

  @Column()
  money: string;
}

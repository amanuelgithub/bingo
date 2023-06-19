import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Branch } from './entities/branch.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BranchCreatedEvent } from './events/branch-created.event';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch) private branchesRepository: Repository<Branch>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const branch = this.branchesRepository.create(createBranchDto);
    if (!branch) {
      throw new ConflictException('branch already exists!');
    }
    await this.branchesRepository.save(branch);

    const branchCreatedEvent = new BranchCreatedEvent();
    branchCreatedEvent.branchId = branch.id;
    this.eventEmitter.emit('branch.created', branchCreatedEvent);

    return branch;
  }

  async findAll(): Promise<Branch[]> {
    const branches = await this.branchesRepository.find();
    if (!branches) {
      throw new NotFoundException('branches not found!');
    }
    return branches;
  }

  async findOne(id: string): Promise<Branch> {
    const branch = await this.branchesRepository.findOne({ where: { id } });
    if (!branch) {
      throw new NotFoundException('branch not found!');
    }
    return branch;
  }
}

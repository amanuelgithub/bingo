import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BranchesService } from '../branches/branches.service';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(Agent) private agentsRepository: Repository<Agent>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private branchesService: BranchesService,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<Agent> {
    const {
      username,
      phone,
      email,
      role,
      status,
      password: pass,
      branchId,
    } = createAgentDto;

    // hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);

    // find branch
    const branch = await this.branchesService.findOne(branchId);
    const {
      agents,
      cashiers,
      createdAt: ct,
      modifiedAt: mt,
      ...restBranchInfo
    } = branch;

    const user = this.usersRepository.create({
      username,
      phone,
      email,
      role,
      status,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);
    const { password, createdAt, modifiedAt, ...restUserInfo } = user;

    //  create agent
    const agent = this.agentsRepository.create({
      userId: user.id,
      branchId: branch.id,
      user: restUserInfo,
      branch: restBranchInfo,
    });
    return await this.agentsRepository.save(agent);
  }

  async findAll(): Promise<Agent[]> {
    const agents = await this.agentsRepository
      .createQueryBuilder('agent')
      .leftJoin('agent.user', 'user')
      .addSelect([
        'user.username',
        'user.phone',
        'user.email',
        'user.isEmailVerified',
        'user.role',
        'user.status',
      ])
      .leftJoin('agent.branch', 'branch')
      .addSelect(['branch.name'])
      .getMany();

    if (!agents) {
      throw new NotFoundException('agents not found!');
    }
    return agents;
  }

  /** 
  findOne(id: number) {
    return `This action returns a #${id} agent`;
  }

  update(id: number, updateAgentDto: UpdateAgentDto) {
    return `This action updates a #${id} agent`;
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
  */
}

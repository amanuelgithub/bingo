import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agent } from './entities/agent.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BranchesService } from '../branches/branches.service';
import { Branch } from 'src/branches/entities/branch.entity';

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

    let agent;
    try {
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
      agent = this.agentsRepository.create({
        userId: user.id,
        // branchId: branch.id,
        user: restUserInfo,
        branches: [branch],
      });

      await this.agentsRepository.save(agent);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // username taken
        const userName = await this.usersRepository.findOne({
          where: { username },
        });
        if (userName) {
          throw new ConflictException('username is taken!');
        }

        // Email taken
        const userEmail = await this.usersRepository.findOne({
          where: { email },
        });
        if (userEmail) {
          throw new ConflictException('email is taken!');
        }

        // Phone taken
        const userPhone = await this.usersRepository.findOne({
          where: { phone },
        });
        if (userPhone) {
          throw new ConflictException('phone is taken!');
        }
      }
    }

    return agent;
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
      .getMany();

    if (!agents) {
      throw new NotFoundException('agents not found!');
    }
    return agents;
  }

  // find an agent by id and include its many-to-many relation with branches table
  async findOne(id: string): Promise<Agent> {
    const agent = await this.agentsRepository
      .createQueryBuilder('agent')
      .where('agent.id = :id', { id })
      .leftJoin('agent.user', 'user')
      .addSelect([
        'user.username',
        'user.phone',
        'user.email',
        'user.isEmailVerified',
        'user.role',
        'user.status',
      ])
      .leftJoinAndSelect('agent.branches', 'branches')
      .getOne();

    // console.log('agent: ', agent);

    if (!agent) {
      throw new NotFoundException('agent not found!');
    }
    return agent;
  }

  async addBranchToAgent(agentId: string, branchId: string) {
    const agent = await this.agentsRepository
      .createQueryBuilder('agent')
      .where('agent.id = :id', { id: agentId })
      .leftJoinAndSelect('agent.branches', 'branches')
      .getOne();

    const branch = await this.branchesService.findOne(branchId);

    agent.branches.push(branch);

    await this.agentsRepository.save(agent);
    return agent;
  }

  // find agent branches
  // async findAgentBranches(agentId: string) {
  //   const agentBranches = await this.agentsRepository
  //     .createQueryBuilder('agent')
  //     .where('agent.id = :agentId', { agentId })
  //     .leftJoinAndSelect('agent.branches', 'branches')
  //     .getOne();

  //   // Logger.log('agentBranches: ', JSON.stringify(agentBranches));

  //   if (!agentBranches) {
  //     throw new NotFoundException('agent not found!');
  //   }

  //   return agentBranches;
  // }

  // async findAllAgentBranches(agentId: string): Promise<Branch[]> {
  //   const branches = await this.branchesService.findAgentBranches(agentId);

  //   if (!branches) {
  //     throw new NotFoundException('branches not found!');
  //   }

  //   return branches;
  // }
}

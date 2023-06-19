import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserStatusEnum, UserTypeEnum } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // creates super-admin //
  async createSuperAdmin() {
    const password = 'aman@G!';
    // hashing password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const superAdminInfo = {
      username: 'SuperAdmin',
      phone: '0963158999',
      email: 'amanuelgirma070@gmail.com',
      isEmailVerified: true,
      role: UserTypeEnum.SUPER_ADMIN,
      status: UserStatusEnum.ACTIVE,
      password: hashedPassword,
    };

    const user = this.usersRepository.create(superAdminInfo);
    await this.usersRepository.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    return 'create user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

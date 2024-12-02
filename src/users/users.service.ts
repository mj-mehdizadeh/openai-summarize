import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    public model: Repository<UserEntity>,
  ) {}

  findUserBy(params: Partial<Pick<UserEntity, 'id' | 'username'>>) {
    return this.model.findOneBy(params);
  }
}

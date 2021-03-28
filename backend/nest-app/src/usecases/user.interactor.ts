import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UsersRepository } from 'src/domain/repositories/user.repository';
import { CreateUsersDto, UpdateUsersDto } from 'src/interfaces/dtos/user.dto';
import { User } from 'src/domain/models/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UsersRepository
  ) {}

  /**
   * ユーザーの一覧を取得する
   * 
   * @returns {Users[]} ユーザー一覧
   */
  async index(): Promise<User[]> {
    return await this.userRepository.find()
  }

  /**
   * ユーザー名でユーザを検索する
   * 
   * @param {string} name - ユーザー名
   * @returns {Users} ユーザー情報
   */
  async findByName(name: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name } });
    return user;
  }

  /**
   * ユーザーを登録する
   * 
   * @param {CreateUsersDto} user - ユーザー
   */
  async insert(user: CreateUsersDto): Promise<void> {
    if (await this.findByName(user.name)) {
      return Promise.reject(new Error('User is already exists.'));
    }
    await this.userRepository.insert({
      ...user
    });
    return;
  }

  /**
   * ユーザー名を更新する
   * 
   * @param {number} id - ユーザーID
   * @param {UpdateUsersDto} user - ユーザー
   */
  async update(id: number, user: UpdateUsersDto): Promise<void> {
    const users = await this.userRepository.findByIds([id]);
    users[0].name = user.name;
    await this.userRepository.save(users);
  }

  /**
   * ユーザーIDを指定してユーザーを削除する
   * 
   * @param {number} id - ユーザーID
   */
  async delete(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
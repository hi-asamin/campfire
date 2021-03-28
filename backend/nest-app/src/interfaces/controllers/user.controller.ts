import { Controller, Get, Post, Body, HttpCode, HttpStatus, HttpException, Param, Delete, Put } from '@nestjs/common'
import { CreateUsersDto, UpdateUsersDto } from 'src/interfaces/dtos/user.dto'
import { UsersService } from 'src/usecases/user.interactor'
import { User } from 'src/domain/models/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    const result: User[] = await this.usersService.index();
    console.log(result);
    const sample: User = { id: 1, name: 'sample' };
    result.push(sample);
    return result;
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<User> {
    return this.usersService.findByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUsersDto) {
    const user = await this.usersService.findByName(createUserDto.name)
    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: `${createUserDto.name}' is already taken.`,
        },
        409,
      );
    }
    try {
      await this.usersService.insert(createUserDto);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal server error.',
        },
        500,
      );
    }
    return;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUsersDto) {
    await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param() param) {
    await this.usersService.delete(param.id);
  }
}
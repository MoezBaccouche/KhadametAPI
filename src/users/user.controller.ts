import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.interface';
import { ProfessionalForProfileDto } from './DTOs/ProfessionalForProfile.dto';
import { SearchedProfessionalDto } from './DTOs/searchedProfessional.dto';
import { UserDto } from './DTOs/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string): Promise<boolean> {
    return this.usersService.exists(email);
  }

  @Post()
  create(@Body() newUser: User): Promise<User> {
    return this.usersService.create(newUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUser: User): Promise<UserDto> {
    return this.usersService.update(id, updateUser);
  }

  @Get('/search/:searchString/:loggedUserId')
  search(
    @Param('searchString') searchString: string,
    @Param('loggedUserId') loggedUserId: string,
  ): Promise<User[]> {
    return this.usersService.search(searchString, loggedUserId);
  }

  @Post('login')
  async login(
    @Body() credentials: { email: string; password: string },
  ): Promise<{ userId: string; token: string; correctCredentials: boolean }> {
    console.log(credentials.email);
    const signedUser = await this.usersService.login(
      credentials.email,
      credentials.password,
    );
    if (signedUser) {
      return {
        userId: signedUser.id,
        token: signedUser.token,
        correctCredentials: true,
      };
    }
    return { userId: null, token: null, correctCredentials: false };
  }

  @Get('skill/:id')
  findProfessionalsBySkill(
    @Param('id') skillId: string,
  ): Promise<SearchedProfessionalDto[]> {
    return this.usersService.findProfessionalsBySkill(skillId);
  }

  @Get('professional/:id')
  findProfessional(
    @Param('id') id: string,
  ): Promise<ProfessionalForProfileDto> {
    console.log('REACHED');
    return this.usersService.findProfessional(id);
  }

  @Get('professionals/best/skill/:id')
  findBestProfessionalsForSkill(
    @Param('id') skillId: string,
  ): Promise<SearchedProfessionalDto[]> {
    return this.usersService.findBestProfessionalsForSkill(skillId);
  }
}

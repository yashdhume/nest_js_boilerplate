import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ControllerFactory } from '@server/common/base/crud.controller';
import { UserEntity } from '@server/user/user/user.entity';
import { UserService } from '@server/user/user/user.service';
import { CreateUserDto } from '@server/user/user/dto/create.user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '@server/auth/guards/roles.guard';
import { RestApiExceptionFilter } from '@server/common/exception/validation.exception';
import { TypeOrmExceptionFilter } from '@server/common/exception/typeorm.exception';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { CurrentUser } from '@server/user/user/decorators/current-user.decorator';
import { FirebaseAuthGuard } from '@server/auth/guards/firebase-auth.guard';
import { Public } from '@server/auth/decorators/public.decorator';
import { FirebaseAuthCreateGuard } from '@server/auth/guards/firebase-auth-create.guard';

@ApiTags('Users')
@Controller('user')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class UserController extends ControllerFactory<UserEntity>() {
  constructor(protected service: UserService) {
    super(service);
  }

  @Post()
  @Public() //Overrides FirebaseAuthGuard
  @UseGuards(FirebaseAuthCreateGuard, RolesGuard)
  @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
  @ApiBody({ type: CreateUserDto })
  async create(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.service.create(body);
  }

  @Get('me')
  @RolesAllowed(UserRole.USER)
  @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
  getMe(@CurrentUser() currentUser: UserEntity): UserEntity {
    return currentUser;
  }
}

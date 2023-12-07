import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ControllerFactory } from '@server/common/base/crud.controller';
import { UserEntity } from '@server/user/user/user.entity';
import { UserService } from '@server/user/user/user.service';
import { CreateUserDto } from '@server/user/user/dto/create.user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '@server/auth/guards/roles.guard';
import {
  RestApiExceptionFilter,
  ValidationException,
} from '@server/common/exception/validation.exception';
import { TypeOrmExceptionFilter } from '@server/common/exception/typeorm.exception';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { CurrentUser } from '@server/user/user/decorators/current-user.decorator';
import { FirebaseAuthGuard } from '@server/auth/guards/firebase-auth.guard';
import { Public } from '@server/auth/decorators/public.decorator';
import { FirebaseAuthCreateGuard } from '@server/auth/guards/firebase-auth-create.guard';
import { FirebaseCurrentUser } from '@server/firebase/decorators/firebase-current-user.decorator';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
  UserNotFoundException,
  UserNotFoundExceptionFilter,
} from '@server/user/exception/user-not-found-exception';

@ApiTags('Users')
@Controller('user')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
@ApiBadRequestResponse({ type: ValidationException })
@ApiUnprocessableEntityResponse({ type: TypeOrmExceptionFilter })
@ApiUnauthorizedResponse()
export class UserController extends ControllerFactory<UserEntity>() {
  constructor(protected service: UserService) {
    super(service);
  }

  @Post()
  @Public() //Overrides FirebaseAuthGuard
  @UseGuards(FirebaseAuthCreateGuard)
  @ApiBody({ type: CreateUserDto })
  async createUser(
    @FirebaseCurrentUser() currentUser: DecodedIdToken,
    @Body() body: CreateUserDto,
  ): Promise<UserEntity> {
    if (currentUser.uid !== body.firebaseUID) throw new UnauthorizedException();
    return this.service.create(body);
  }

  async create(): Promise<undefined> {
    return;
  }

  @Get('me')
  @RolesAllowed(UserRole.USER)
  @UseFilters(new UserNotFoundExceptionFilter())
  @ApiNotFoundResponse({ type: UserNotFoundException })
  getMe(@CurrentUser() currentUser: UserEntity): UserEntity {
    return currentUser;
  }
}

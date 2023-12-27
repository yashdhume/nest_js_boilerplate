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
import { ApiBody, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { CurrentUser } from '@server/user/user/decorators/current-user.decorator';
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
export class UserController extends ControllerFactory<UserEntity>() {
  constructor(protected service: UserService) {
    super(service);
  }
  async create(): Promise<undefined> {
    return;
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

  @Get('me')
  @RolesAllowed(UserRole.USER)
  @UseFilters(new UserNotFoundExceptionFilter())
  @ApiNotFoundResponse({ type: UserNotFoundException })
  getMe(@CurrentUser() currentUser: UserEntity): UserEntity {
    return currentUser;
  }
}

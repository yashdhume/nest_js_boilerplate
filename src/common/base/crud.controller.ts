import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Type,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AbstractValidationPipe } from '@server/common/base/abstract-validation.pipe';
import { ICrudController } from '@server/common/base/interfaces/crud.interface.controller';
import { IDDto } from '@server/common/base/ID.dto';
import { ICrudService } from '@server/common/base/interfaces/crud.interface.service';
import { DeepPartial } from 'typeorm';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { BaseQueryDto } from '@server/common/base/interfaces/base.query.dto';
import { TypeOrmExceptionFilter } from '@server/common/exception/typeorm.exception';
import {
  RestApiExceptionFilter,
  ValidationException,
} from '@server/common/exception/validation.exception';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { FirebaseAuthGuard } from '@server/auth/guards/firebase-auth.guard';
import { RolesGuard } from '@server/auth/guards/roles.guard';

type ClassType<T> = new (...args: any[]) => T;

export function ControllerFactory<
  T,
  C extends DeepPartial<T> = T,
  U extends DeepPartial<T> = T,
>(
  createDto?: Type<C>,
  updateDto?: Type<U>,
): ClassType<ICrudController<T, C, U>> {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto },
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto },
  );
  const queryPipe = new AbstractValidationPipe(
    {
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    },
    { query: BaseQueryDto },
  );
  @ApiBearerAuth()
  @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @ApiBadRequestResponse({ type: ValidationException })
  @ApiUnprocessableEntityResponse({ type: TypeOrmExceptionFilter })
  @ApiUnauthorizedResponse()
  class CrudController<T, C extends DeepPartial<T>, U extends DeepPartial<T>>
    implements ICrudController<T, C, U>
  {
    protected service: ICrudService<T>;

    @Get(':id')
    @RolesAllowed(UserRole.ADMIN)
    findOne(@Param() params: IDDto): Promise<T> {
      return this.service.findOne(params.id);
    }

    @Get()
    @UsePipes(queryPipe)
    @RolesAllowed(UserRole.ADMIN)
    find(@Query() query: BaseQueryDto): Promise<T[]> {
      return this.service.find(query);
    }

    @Post()
    @UsePipes(createPipe)
    @ApiBody({ type: createDto })
    @RolesAllowed(UserRole.ADMIN)
    async create(@Body() body: C): Promise<T> {
      return this.service.create(body);
    }

    @Put(':id')
    @UsePipes(updatePipe)
    @ApiBody({ type: updateDto })
    @RolesAllowed(UserRole.ADMIN)
    update(@Param() params: IDDto, @Body() body: U): Promise<T> {
      return this.service.update(params.id, body);
    }

    @Delete(':id')
    @RolesAllowed(UserRole.ADMIN)
    delete(@Param() params: IDDto): Promise<void> {
      return this.service.delete(params.id);
    }
  }

  return CrudController;
}

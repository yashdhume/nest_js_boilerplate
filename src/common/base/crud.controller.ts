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
  UsePipes,
} from '@nestjs/common';
import { AbstractValidationPipe } from '@server/common/base/abstract-validation.pipe';
import { ICrudController } from '@server/common/base/interfaces/crud.interface.controller';
import { IDDto } from '@server/common/base/ID.dto';
import { ICrudService } from '@server/common/base/interfaces/crud.interface.service';
import { DeepPartial } from 'typeorm';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BaseQueryDto } from '@server/common/base/interfaces/base.query.dto';
import { TypeOrmExceptionFilter } from '@server/common/exception/typeorm.exception';
import { RestApiExceptionFilter } from '@server/common/exception/validation.exception';
import { RolesAllowed } from '@server/auth/decorators/roles.decorator';
import { UserRole } from '@server/auth/enums/user-role.enum';

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
  class CrudController<T, C extends DeepPartial<T>, U extends DeepPartial<T>>
    implements ICrudController<T, C, U>
  {
    protected service: ICrudService<T>;

    @Get(':id')
    @RolesAllowed(UserRole.USER)
    @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
    findOne(@Param() params: IDDto): Promise<T> {
      return this.service.findOne(params.id);
    }

    @Get()
    @RolesAllowed(UserRole.ADMIN)
    @UsePipes(queryPipe)
    @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
    find(@Query() query: BaseQueryDto): Promise<T[]> {
      return this.service.find(query);
    }

    @Post()
    @RolesAllowed(UserRole.USER)
    @UsePipes(createPipe)
    @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
    @ApiBody({ type: createDto })
    async create(@Body() body: C): Promise<T> {
      return this.service.create(body);
    }

    @Put(':id')
    @RolesAllowed(UserRole.ADMIN)
    @UsePipes(updatePipe)
    @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
    @ApiBody({ type: updateDto })
    update(@Param() params: IDDto, @Body() body: U): Promise<T> {
      return this.service.update(params.id, body);
    }

    @Delete(':id')
    @RolesAllowed(UserRole.ADMIN)
    @UseFilters(new RestApiExceptionFilter(), new TypeOrmExceptionFilter())
    delete(@Param() params: IDDto): Promise<void> {
      return this.service.delete(params.id);
    }
  }

  return CrudController;
}

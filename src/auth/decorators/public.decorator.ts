import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@server/auth/enums/user-role.enum';

export const Public = () => SetMetadata(UserRole.PUBLIC, true);

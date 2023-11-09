import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@server/auth/enums/user-role.enum';

export const RoleMetaDataKey = 'role';
export const RolesAllowed = (...roles: UserRole[]) =>
  SetMetadata(RoleMetaDataKey, roles);

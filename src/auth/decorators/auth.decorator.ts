import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserEntity } from '../../users/entities/user.entity';

/**
 * Retrieves the current storeId.
 * @since 1.5.0
 */
export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

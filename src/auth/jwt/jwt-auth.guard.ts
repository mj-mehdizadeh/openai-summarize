import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../../users/users.service';
import { PUBLIC_ROUTE_KEY } from '../auth.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private userService: UsersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublicRoute) {
      return true;
    }
    if (!(await super.canActivate(context))) {
      return false;
    }
    // const requiredRoles = this.reflector.getAllAndOverride<UsersRole[]>(
    //   ROLES_KEY,
    //   [context.getHandler(), context.getClass()],
    // );
    // if (!requiredRoles || !requiredRoles.length) {
    //   return true;
    // }
    const { user } = request;
    const userModel = await this.userService.findUserBy({
      id: user.id,
    });
    if (!userModel) return false;

    request.user = userModel;
    // return requiredRoles.some((role) => userStore.role === role);
    return true;
  }
}

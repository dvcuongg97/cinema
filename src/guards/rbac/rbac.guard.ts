
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RbacGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        //
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log('requiredRoles: ', requiredRoles);
        if (!requiredRoles) {
            return true; // Không yêu cầu vai trò cụ thể
        }
        //
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('user: ', user);
        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }
        //
        const hasRole = requiredRoles.includes(user.role);
        if (!hasRole) {
            throw new ForbiddenException('User does not have the required role');
        }

        return true;
    }
}

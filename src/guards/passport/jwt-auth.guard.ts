
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return super.canActivate(context)
    }
    handleRequest<TUser = any>(
        err: any,
        user: any,
        info: any,
        context: ExecutionContext,
        status?: any): TUser {
        if (err || !user) {
            console.log('user-jwt: ', user);
            console.log('err-jwt: ', err);
            throw new Error(err) || new UnauthorizedException('Unauthorized')
        }
        return user
    }
}

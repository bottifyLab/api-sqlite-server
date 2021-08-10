import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException,HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles-auth.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requredRoles = this.reflector.getAllAndOverride(ROLES_KEY,[
                    context.getHandler(),
                    context.getClass()
                ])
            if (!requredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token  = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
              throw new UnauthorizedException({message: 'Необходимо авторизоваться'})
            }
            const user = this.jwtService.verify(token);
            req.user = user;
            return user.roles.some(role => requredRoles.includes(role.value));
        } catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN )
        }
    }
}





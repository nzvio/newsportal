import { Injectable, CanActivate, ExecutionContext, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    public canActivate(context: ExecutionContext): boolean {        
        let token: string = context.switchToHttp().getRequest().headers["token"];        
        
        try {
            this.jwtService.verify(token);
            return true;
        } catch (err) {
            throw new HttpException({statusCode: 403, error: err.name}, 200);
        }        
    }
}
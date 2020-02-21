import { Controller, UseGuards, Post, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('api/admin/auth')
export class AuthController {
    // For login we will use AuthGuard with "local" strategy - built-in "passport" guard.
    // Route will send "200" and user data, if user has been validated with credentials, otherwise it will be send "401".
    @UseGuards(AuthGuard("local"))
    @Post("login")
    public async login(@Request() req): Promise<any> {
        return req.user;
    }
}
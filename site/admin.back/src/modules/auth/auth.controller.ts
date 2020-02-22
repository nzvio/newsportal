import { LoginDTO } from "./dto/login.dto";
import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IAnswer } from "../../interfaces/answer.interface";
import { IAuthData } from "./interfaces/authdata.interface";

@Controller('api/admin/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    // authentication by email and password
    @Post("login")
    public login(@Body() dto: LoginDTO): Promise<IAnswer<IAuthData>> {                        
        return this.authService.login(dto);
    }    
}

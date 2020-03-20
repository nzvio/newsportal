import { LoginDTO } from "./dto/login.dto";
import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IAnswer } from "../../model/answer.interface";
import { IAuthDataDTO } from "./dto/authdata.dto";

@Controller('api/visitor/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    // authentication by email and password
    @Post("login")
    public login(@Body() dto: LoginDTO): Promise<IAnswer<IAuthDataDTO>> {                        
        return this.authService.login(dto);
    }    
}

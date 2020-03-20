import { UserDTO } from "../../users/dto/user.dto";

export interface IAuthDataDTO {
    readonly user: UserDTO;
    readonly token: string;    
}
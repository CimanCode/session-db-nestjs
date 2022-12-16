import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(username, pass): Promise<any> {
        const user = await this.userService.findByUsername(username);
        console.log(user.username)
        if(user && user.password == pass){
            const {password, ...result } = user;
            return result;
        }
        
        return null;
    }
}

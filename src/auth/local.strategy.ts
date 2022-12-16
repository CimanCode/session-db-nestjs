import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from "./auth.service";


@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authservice: AuthService) {
        super();
    }

    async validate(username: string, password:string) {
        const users = await this.authservice.validateUser(username,password);
        if(!users){
            throw new UnauthorizedException();
        }
        return users;
    }
}
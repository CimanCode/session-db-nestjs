import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entiy';

@Injectable()
export class UserService {
    private readonly user : any[];
    constructor(
        @InjectRepository(user) private readonly userRepository: Repository<user>,
    ) {
        this.user = [
            {
                userid: 1,
                username: 'jhon doe',
                password: 'changeme',
                pet: {name: 'alfred', picId:1}
            },
            {
                userid: 2,
                username: 'chris',
                password: 'screet',
                pet: {name: 'ghoper', picId:2}
            },
            {
                userid: 3,
                username: 'maria',
                password: 'gues',
                pet: {name: 'jenny', picId:3}
            }
        ]
    }

    createUser(createUserDto: user) {
        const newUser = this.userRepository.create({
            username: createUserDto.username,
            password: createUserDto.password,
            email: createUserDto.email,
        });
        return this.userRepository.save(newUser);
      }

    async findOne(username: string): Promise<any>{
        return this.user.find(user => user.username === username)
    }

    async find(username: string): Promise<any> {
        return this.userRepository.findOne({
            where: {
                username: username
            }
        })
    }
}

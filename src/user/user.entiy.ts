
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user')
export class user{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: 'varchar', length: 20, nullable: true})
    username: string;

    @Column({type: 'varchar', length: 60, nullable: true})
    email: string;

    @Column({type: 'text', nullable: true})
    password: string;

}
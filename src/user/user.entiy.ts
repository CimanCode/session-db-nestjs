
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user')
export class user{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: 'varchar', length: 20, nullable: false})
    username: string;

    @Column({type: 'varchar', length: 60, nullable: false})
    email: string;

    @Column({type: 'text', nullable: false})
    password: string;

}
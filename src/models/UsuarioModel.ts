import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuarios")
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn() 
    id: number
    
    @Column()
    name: string

    @Column()
    email: string 

    @Column()
    password: string
}
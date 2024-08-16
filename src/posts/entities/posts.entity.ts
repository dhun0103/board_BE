import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PostsModel {
    @PrimaryGeneratedColumn()
    id : string;

    @Column()
    author : string;

    @Column()
    title : string;

    @Column()
    content : string;
    
    @CreateDateColumn()
    createdAt : Date;
    
    @UpdateDateColumn()
    updatedAt : Date;
}
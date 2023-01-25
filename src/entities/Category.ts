import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Movie } from "./Movie";

@Entity('categories')
export class Category {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Movie, (movie) => movie.category)
    movies: Movie[];

    constructor() {
        if (!this.id) {
            this.id = uuid(); 
        }
    }
}
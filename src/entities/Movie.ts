import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";

@Entity('movies')
export class Movie {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    description: string;
   
    @Column()
    duration: number;
    
    @CreateDateColumn()
    created_at: Date;
    
    @Column()
    category_id: string;

    @ManyToOne(() => Category, (category) => category.movies)
    @JoinColumn({name: 'category_id'})
    category: Category;

    constructor() {
        if (!this.id) {
            this.id = uuid(); 
        }
    }
}
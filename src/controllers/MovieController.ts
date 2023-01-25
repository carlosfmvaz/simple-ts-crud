import { Request, Response } from "express";
import { REPLCommand } from "repl";
import { movieRepository } from "../repositories/MovieRepository";

export class MovieController {
    async create(req: Request, res: Response) {
        const { name, description, duration, category_id } = req.body;

        if (!name || !description || !duration || !category_id) {
            return res.status(400).json({ message: 'Empty Fields are not allowed' });
        }

        try {
            const newMovie = movieRepository.create({ 
                name, description, duration, category_id
            });
            await movieRepository.save(newMovie);

            return res.status(201).json(newMovie);           
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async get(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) res.status(400).json({ message: 'Cannot handle an empty ID' });

        try {
            const movie = await movieRepository.findOne({ 
                where: { id },
                relations: ['category']
            });

            return res.status(200).json(movie);
        } catch (error) {
            console.log("🚀 ~ file: MovieController.ts:39 ~ MovieController ~ get ~ error", error)
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            
            const movie = await movieRepository.find({
                relations: ['category']
            });


            return res.status(200).json(movie);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const incomingMovie = req.body;

            if (!id || !incomingMovie) res.status(400).json({ message: 'Empty fields' });

            await movieRepository.update({ id }, { 
                name: incomingMovie.name,
                description: incomingMovie.description,
                duration: incomingMovie.duration,
                category_id: incomingMovie.category_id,
             });
            return res.status(200).json({ message: 'Category Successfully Updated' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;
        
        if (!id) res.status(400).json({ message: 'Cannot handle an empty ID' });
        
        try {
            await movieRepository.delete(id);
            return res.status(202).json({ message: 'Movie Successfully Deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
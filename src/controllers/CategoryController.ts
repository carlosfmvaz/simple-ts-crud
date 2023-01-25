import { Request, Response } from "express";
import { REPLCommand } from "repl";
import { categoryRepository } from "../repositories/CategoryRepository";

export class CategoryController {
    async create(req: Request, res: Response) {
        const name = req.body.name;

        if (!name) {
            return res.status(400).json({ message: 'Empty Fields are not allowed' });
        }

        try {
            const newCategory = categoryRepository.create({ name });
            await categoryRepository.save(newCategory);

            return res.status(201).json(newCategory);           
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async get(req: Request, res: Response) {
        const id = req.params.id;

        if (!id) res.status(400).json({ message: 'Cannot handle an empty ID' });

        try {
            const category = await categoryRepository.findOne({ where: { id } });
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const category = await categoryRepository.find();
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const incomingCategory = req.body;

            if (!id || !incomingCategory) res.status(400).json({ message: 'Empty fields' });

            const categoryToUpdate = await categoryRepository.update({ id }, { 
                name: incomingCategory.name
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
            await categoryRepository.delete(id);
            return res.status(202).json({ message: 'Category Successfully Deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
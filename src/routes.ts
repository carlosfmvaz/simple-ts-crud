import { Router } from "express";
import { CategoryController } from "./controllers/CategoryController";
import { MovieController } from "./controllers/MovieController";

const routes = Router();

// Categories
routes.post('/category/create', new CategoryController().create);
routes.get('/category/all', new CategoryController().getAll);
routes.get('/category/:id', new CategoryController().get);
routes.put('/category/update/:id', new CategoryController().update);
routes.delete('/category/delete/:id', new CategoryController().delete);

// Movies
routes.post('/movie/create', new MovieController().create);
routes.get('/movie/all', new MovieController().getAll);
routes.get('/movie/:id', new MovieController().get);
routes.put('/movie/update/:id', new MovieController().update);
routes.delete('/movie/delete/:id', new MovieController().delete);

export default routes;
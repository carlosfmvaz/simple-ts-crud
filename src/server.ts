import express from "express";
import routes  from "./routes";
import { AppDataSource } from "./data-source";

const port = process.env.MYSQL_PORT as unknown as number | undefined;
AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json());
    app.use(routes);

    app.listen(8080, () => console.log(`Server Running`));
}).catch(err => console.log(err));
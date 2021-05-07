import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import { ItemsRoute } from "./routes";

dotenv.config({ path: `${__dirname}/../.env.${process.env.NODE_ENV}` });

const app = express();
app.use(cors());
app.use('/items', ItemsRoute);

const mongoUrl = process.env.MONGO_URL!;

const mongoClient = new MongoClient(mongoUrl, { useUnifiedTopology: true });
const initMongo = async () => {
    await mongoClient.connect((err, client) => {
        if (err) return err;
        console.log('connected to mongo');
        app.locals.mongoDBTodoList = client.db('todo-list');
    });
}

const port = process.env.NODE_PORT;
initMongo().then(() => {
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
});


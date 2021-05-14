import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient } from 'mongodb';
import ItemsRoute from './routes';

dotenv.config({ path: `${__dirname}/../.env.${process.env.NODE_ENV}` });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/items', ItemsRoute);

if (!process.env.MONGO_URL) {
  throw Error('Mongo url need to be specified on environment file');
}

const mongoUrl = process.env.MONGO_URL;

const mongoClient = new MongoClient(mongoUrl, { useUnifiedTopology: true });
const initMongo = async () => {
  await mongoClient.connect((err, client): void => {
    if (err) {
      throw Error('Couldn\'t establish a connection with Mongo DB');
    }
    app.locals.mongoDBTodoList = client.db('todo-list');
  });
};

const port = process.env.NODE_PORT;
initMongo().then(() => {
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening at http://localhost:${port}`);
  });
});

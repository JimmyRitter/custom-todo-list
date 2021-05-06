import express from 'express';
import { ItemsRoute } from "./routes";
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3001;

app.use('/items', ItemsRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

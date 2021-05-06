import express from 'express';
const app = express();
const port = 3001;

app.get('/', (req: any, res: any) => {
    res.send('Hello from API');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

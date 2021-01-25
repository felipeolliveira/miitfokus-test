import './database';

import cors from 'cors';
import express, { json } from 'express';

import routes from './routes';

const app = express();

app.use(json());
app.use(cors());

app.use(routes);

app.listen(3333, () => console.log('server on http://localhost:3333'));

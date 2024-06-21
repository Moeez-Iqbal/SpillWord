import express, { json } from "express";
import dataBaseInIt from './db/init.js';
import allRouter from './routes/index.js';



const app = express();
dataBaseInIt().then(() => console.log("DataBase is synced"));

app.use(json());
app.use(allRouter);
app.listen(3000, () =>console.log("Server Is Running on Port 3000"));
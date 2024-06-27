import express, { json } from "express";
import dataBaseInIt from './db/init.js';
import allRouter from './routes/index.js';
import cors from "cors"



const app = express();

dataBaseInIt().then(() => console.log("DataBase is synced"));

app.use(json());
app.use(cors())
app.use(allRouter);
app.listen(3003, () => console.log("Server Is Running on Port 3003"));

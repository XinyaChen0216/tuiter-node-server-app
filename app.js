import express from 'express';
import HelloController from './controllers/hello-controller.js';
import UserController from './user/users.controller.js';
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from 'cors'
import session from "express-session";
import AuthController from './user/auth-controller.js';
import mongoose from 'mongoose';

const app = express()
app.use(
    session({
        secret: "any string",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(cors({
    credentials: true,
    origin: "https://a6--capable-biscotti-961687.netlify.app",
})
)
app.use(express.json());
const port = process.env.PORT || 4000;
TuitsController(app);
HelloController(app)
UserController(app)
app.listen(process.env.PORT || 4000);
AuthController(app);

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/tuiter"

mongoose.connect(CONNECTION_STRING);


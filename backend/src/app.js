import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import errorHandler from './middleware/error.middleware.js'
import tripRouter from './routes/trip.routes.js'
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin: process.env.FRONTEND,
//     credentials:true
// }))
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true,
}))
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);
app.use(errorHandler);


export default app;
import dotenv from 'dotenv'
import app from './app.js'
import connectToDB from './config/db.js'
dotenv.config();

connectToDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("Server is Running...")
})
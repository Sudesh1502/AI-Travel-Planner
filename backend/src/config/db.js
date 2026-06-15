import mongoose from 'mongoose'

const connectToDB = async() =>{
    try{
        const connection = await mongoose.connect(
            process.env.MONGO_DB_URI
        )

        console.log(`
            MongoDB connected: ${connection.connection.host}
            `)
    }catch(error){
        console.error(
            "MongoDB connection error:",
            error.message
        );

        process.exit(1);
    }
}

export default connectToDB;
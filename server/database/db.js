import mongoose from "mongoose";

const Connection = async (username, password) =>{
    const URL = `mongodb+srv://${username}:${password}@cluster0.mwtyo4y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try{
        await mongoose.connect(URL, {useUnifiedTopology : true, useNewUrlParser : true,})
        console.log("Database Connected")
    }catch(error){
        console.log("Error While Connecting Database", error);
    }
}

export default Connection
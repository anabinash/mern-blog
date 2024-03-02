import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from'./routes/user.routes.js'
import authRouter from'./routes/auth.route.js'
import cors from 'cors'

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDB is connected!');
    })
    .catch((err) => {
        console.log(err);
    });
    
app.use(cors());
// APIS 
app.use(express.json());

app.use('/api/user',userRouter) ;  
app.use('/api/auth',authRouter)


// middle-ware
app.use((err,req,resp,next)=>{
    const  statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    resp.status(statusCode).json({success:false,statusCode,message});
});


app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});

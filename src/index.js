// ------------2ND METHOD H --------------------------->>
import dotenv from "dotenv";
import { app } from './app.js';
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({
   path: './.env'
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
  });




  

// ------------1ST METHOD H --------------------------->>


// // using iife and try catch 
// (async () => {
//     try {
//         await mongoose.connect(`{process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) =>{
//             console.log("error", error);
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`PORT IS LISTINING ON${process.env.PORT}`)
//         })

//     }catch (error) {
//         console.log(error);
//         throw error
//     }
// })
    // (); 
  // |
  // |<-------- function call
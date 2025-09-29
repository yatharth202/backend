// require('dotenv').config({path: './env'})
import express from "express";
import dotenv from "dotenv" // as ealry as possible import and cofigure .env //jitne jaldi application load ho utne jaldi envirement variable sari jagaha avaialbae hojane chaiye
import connectDB from "./db/index.js";



dotenv.config({
    path: './env'
})

const app = express();

connectDB() //return promises
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(` Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!! ",err);
})


//copy
// (async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{ //Data base connect hoogya hai but express ki app se baat nahi kar paarahi hoo 
//         console.log("Application not able to talk to Database",error)
//        })
//     } catch (error) {
//         console.log("Error: ",error)
//         throw error
//     }
// })() // iefies




// import express from "express"
// const app = express()

// (async () => {
//     try {
//        await mongoose.connect(`$process.env.MONGODB_URI/${DB_NAME}`)
//        app.on("error",() => {
//         console.log("Error:",error);
//         throw error
//        })

//        app.listen(process.env.PORT, ()=>{
//         console.log(`App is listening on port ${process.env.PORT}`)
//        })
//     } catch (error) {
//         console.log("Error: ",error)
//         throw error
//     }
// })()
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import allRoutes from "./routes/allRoutes.js";

const app = express();
const port = 5000;

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/",allRoutes);
app.all("*",(req,res)=>{
    res.send("url doesnot exist");
})

app.listen(port,()=>{
    console.log(`Server is running in port : http://localhost:${port}`)
})
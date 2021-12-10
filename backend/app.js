const express = require("express");

const app = express();
const bodyParser= require('body-parser');

app.use(bodyParser.json());
require("dotenv/config")
let port = process.env.PORT;
app.get('/',(req,res)=>{
    res.send("hello world!");
})



app.listen(port, ()=>{
    console.log("server listening at port " ,port);
})

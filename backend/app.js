const express = require("express");
const mongoose = require('mongoose')
const app = express();
const bodyParser= require('body-parser');
require("dotenv/config")
let ProductRouter = require('./Routers/Products');
let UserRouter = require('./Routers/User');
let OrdersRouter = require('./Routers/Orders');
let CategoryRouter = require('./Routers/Category');
// let OrderItemRouter = require('./Routers/OrderItem');
const morgan = require('morgan');
app.use(bodyParser.json());
app.use(morgan('tiny'));
let port = process.env.PORT;
let api = process.env.API_URL

app.use(`${api}/products`,ProductRouter);
app.use(`${api}/users`,UserRouter);
app.use(`${api}/orders`,OrdersRouter);
app.use(`${api}/category`,CategoryRouter);

app.get('/',(req,res)=>{
    res.send("hello world!");
});

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("mongoDb database connected successfully....")
})
.catch((err)=>{
    console.log(err);
})
app.listen(port, ()=>{
    console.log("server listening at port " ,port);
})

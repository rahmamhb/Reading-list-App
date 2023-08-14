const Book = require("./models/book")
const Author = require("./models/author")
const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema")
const mongoose = require("mongoose")
const cors = require("cors");
const app = express();

app.use(cors({ origin:'http://localhost:3000' }));

mongoose.connect("mongodb+srv://rmihoub:12345@cluster0.jt7m7j6.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.once("open",()=>{
    console.log("connected to database")
})
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql : true ,
}))
app.listen(4000 , ()=>{
    console.log("now listening to port 4000")
})
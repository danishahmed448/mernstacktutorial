const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {errorHighlighter,successHighlighter} = require('./helper/highlighter.js');
const authRoute = require('./routes/auth');
const userRoute=require('./routes/users.js');
const movieRoute=require('./routes/movies.js');
const listRoute=require('./routes/lists.js');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>successHighlighter('[mongodb]','connection successful'))
.catch((err)=>errorHighlighter(err.message))

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",listRoute);

app.listen(8800,()=>{
    successHighlighter('[backend]','server running');
})
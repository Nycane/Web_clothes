const express = require('express')
const app = express()
const initRoutes = require('./routes')
const cors = require('cors')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// cors
app.use(cors())
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//   });
initRoutes(app)
const port =  process.env.PORT||3000
app.listen(port,()=>{
    console.log("connect localhost",process.env.PORT)
})
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const examServer = express()

examServer.use(cors())
examServer.use(express.json())
examServer.use(router)

const PORT = 3000 || process.env.PORT

examServer.listen(PORT,()=>{
    console.log(` Server started at port: ${PORT} and waiting for client request !!`);
    
})

examServer.get('/',(req,res)=>{

    res.status(200).send(`<h1 style="color:red">  Server started and waiting for client request !!</h1>`)

})
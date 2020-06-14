const express = require('express')
const bodyParser = require('body-parser')
require('./src/db/mongoose')
const cors = require('cors')
const UserRouter = require('./src/routers/User')
const ApartmentRouter = require('./src/routers/Apartment')


const app = express()

//port address
const port = process.env.PORT || 5000
 
app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Routers 
app.use(UserRouter)
app.use(ApartmentRouter)
app.use('/images', express.static('images'))
//start server
app.listen( port, ()=>{
  console.log(`Server is listening on port ${port}`)
})
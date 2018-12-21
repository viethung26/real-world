const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT||3000
const mongoose = require('mongoose')
const MONGO_DB_USER = 'admin'
const MONGO_DB_PASSWORD = 'admin111111'


mongoose.set('useCreateIndex', true)
// mongoose.connect("mongodb://localhost/real-world", {useNewUrlParser: true})
mongoose.connect('mongodb://ds141294.mlab.com:41294/real-world' ,{auth: {
    user: MONGO_DB_USER,
    password: MONGO_DB_PASSWORD
  },useNewUrlParser: true})
require('./models/User')
require('./models/Article')
require('./models/Comment')

app.use(express.static(path.join(__dirname, "public")))
app.use('/public' , express.static(path.join(__dirname, "public")))
app.use(require('./routes'))
app.use((err, req, res, next)=> {
    res.status(err.status||500)
    res.json({'errors':{
        message: err.message,
        error: {}
    }})
})
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}...`)
})
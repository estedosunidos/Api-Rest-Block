const {conection}  = require('../proyecto1/database/conection')
const express = require('express')
const cors = require('cors')

conection()

const app= express()

const port =3025

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const rootesarticle=require('../proyecto1/router/Article')
app.use("/api/",rootesarticle)

app.listen(port ,()=>{
    console.log('listening on port '+port)
})
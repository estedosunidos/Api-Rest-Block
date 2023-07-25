const mongoose = require('mongoose')

const conection= async()=>{
    try{
       await  mongoose.connect("mongodb://127.0.0.1:27017/mi-blog")
       console.log('conect successfully connected')
    }catch(err){
        console.log(err)
        throw new Error('Could not connect to BD ')
    }
}
module.exports={conection}
const express = require('express');
const  multer = require('multer');
const articlecontroller=require('../controller/Article')
const storange=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./imagene/articulos')
    },
    filename:(req,file,cb)=>{
        cb(null,'art'+Date.now()+file.originalname)

    }
})
const upload=multer({storage:storange})
const routes = express.Router()
routes.get('/',articlecontroller.prueba)
routes.post('/createArticle',articlecontroller.CreateArticle)
routes.get('/getArticle',articlecontroller.getarticle)
routes.get('/oneArticle/:id',articlecontroller.oneArticle)
routes.delete('/deletearticle/:id',articlecontroller.deleteArticle)
routes.put('/updateArticle/:id',articlecontroller.updateArticle)
routes.post('/uploadimgan/:id',[upload.single('file')],articlecontroller.uploadimgan)
routes.get('/image/:file',articlecontroller.image)
routes.get('/search/:text',articlecontroller.search)
module.exports=routes
const validator=require("validator")
const validatorArticle=(parameters)=>{
    let validatortitle = !validator.isEmpty(parameters.title) && 
        validator.isLength(parameters.title, { min: 5, max: undefined }); 
    let validatorcontent = !validator.isEmpty(parameters.content); 
    if (!validatortitle || !validatorcontent) { 
        throw new Error('This is not a valid article'); 
    } 
}
module.exports = {validatorArticle}
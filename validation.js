import Joi from '@hapi/joi'



//validation for register
 const registerValidation=(data)=>{

  const schema= Joi.object({
        name:Joi.string().min(6).required(),
        email:Joi.string().min(15).email().required(),
        password:Joi.string().min(6).required(),
        date:Joi.date().optional()
        
    
    }).options({abortEarly:false})

 return schema.validate(data)
}


 const loginValidation=(data)=>{

    const schema= Joi.object({
     
        email:Joi.string().min(15).email().required(),
        password:Joi.string().min(6).required(),

}).options({abortEarly:false})

return schema.validate(data)

 }
export  {registerValidation,loginValidation};

 


  

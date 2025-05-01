const errorHandler=(error,req,res,next)=>{
  const statusCode=res.statuscode? res.statusCode:500;
  return res.status(statusCode).json({
    message:error.message,statusCode:statusCode
  })

};
module.exports=({errorHandler,

})
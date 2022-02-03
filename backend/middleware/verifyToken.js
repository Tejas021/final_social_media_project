const jwt = require("jsonwebtoken")

const verifyToken=(req,res,next)=>{
    const token = req.header("xAuthToken");
  
    try{  if(token){
       
            jwt.verify(token.split(" ")[1],process.env.SECRET_KEY,(err,user)=>{
                if(err)res.status(404).json("not Authorized")
                else{
                    req.user=user
                    next()
                }
            })
      
    }else{
        res.status(404).send("token not found")
    }}catch(err){
res.status(400).send("not authenticated")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
  
        if(req.user.id===req.params.id||req.user.isAdmin===true){
          
            next()
        }
        else{
            res.status(403).json("unauthroized")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin===true){
            next()
        }
        else{
            res.status(403).json("unauthroized")
        }
    })
}


module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}

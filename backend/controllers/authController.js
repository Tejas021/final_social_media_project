const User = require("../models/User")
const jwt = require("jsonwebtoken");
const router = require("../routes/messageRoutes");
const {verifyToken} = require('../middleware/verifyToken')

const maxAge= 5*24*60*60;

const key = process.env.SECRET_KEY
const createJWT=(id,isAdmin)=>{
    // console.log(key)
    return jwt.sign({id,isAdmin},key,{
    expiresIn:maxAge
    })
}

const alertError = (err) => {
    let errors = { name: '', email: '', password: '' }
 
    if (err.message === 'incorrect email') {
        errors.email = 'This email not found';
    }
    if (err.message === 'incorrect pwd') {
        errors.password = 'The password is incorrect';
    }
    if (err.code === 11000) {
        errors.email = 'This email already registered';
        return errors;
    }
    if (err.message.includes('user validation failed')) {

        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}


module.exports.signin=async (req,res)=>{

const {email }=req.body;


  try{
      const user=await User.login(email,req.body.password);

  const accessToken=createJWT(user._id,user.isAdmin)



const {password,...others} = user._doc;

      
       res.status(200).send({...others,accessToken})

  }
  catch(err){
    // console.log("hi")
   let errors=alertError(err)
//    console.log(errors)
    res.status(400).send({errors})
  }


}



module.exports.signup=async (req,res)=>{


try{
    const {name,email,college_id,isAdmin }=req.body;
    // console.log(req.body)

const newUser= await User.create({name,password:req.body.password,email,college_id,Admin:isAdmin})

const token = createJWT(newUser._id,newUser.Admin)

// const data = {...newUser,token}

const {password,...others} = newUser._doc;

// console.log({...others,token})
res.status(201).send({...others,token})
}
catch(err){
   
    let errors=alertError(err)
    // console.log(err)
    res.status(400).json({errors})
    }

        
}

module.exports.verifyUser =  async (req, res) => {
    // console.log("---auth---")
    // console.log(req)
    // console.log(req.user)
    if (req.user) {
        try {
            // console.log(req.user)
            const user = await User.findById(req.user.id)
            res.status(200).json(user)
        } catch (err) {
            // console.log(err)
            res.status(500).send(err)
        }

    } else {
      


        // console.log("no token")
    }
}

module.exports.updateUser=async(req,res)=>{
          
            const user1 =await User.findByIdAndUpdate(req.body.user_id,{
                bio:req.body.bio,
                city:req.body.city,
                department:req.body.department,
                name:req.body.name
            }, {new: true, useFindAndModify: false},(err,docs)=>{
                if (err){
                    console.log(err)
                }
               

            })
            
            return res.status(200).send(user1)
        }
        
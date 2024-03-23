const {Router}=require("express")

const bcrypt=require("bcrypt")


const jwt=require("jsonwebtoken")
const UserModel = require("../models/user.model")
const userModel = require("../models/user.model")



const userRouter= Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password,username}=req.body
    try {

        const existingUser=await UserModel.findOne({email})
        if(existingUser){
            return res.status(400).send({
                err:"User already Registered"
            })
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                return res.status(400).send({err:err})
            }
            const newuser=new UserModel({...req.body,password:hash})
            await newuser.save()
            return res.status(200).json({ message: "Registration successful", user: newuser });
        })
    } catch (err) {
       return res.status(400).send({err:err.message})
    }
})


// login post
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                err: "User not found"
            });
        }

        bcrypt.compare(password, user.password, async (err, data) => {
            try {
                if (data) {
                    const token = jwt.sign({ userId: user._id }, "masai");
                   
                    return res.status(200).send({
                        msg: "Login Successful",
                        token,
                        userId: user._id,
                        username: user.username,
                        todos:user.todos,
                        email:user.email
                    });
                }
            } catch (err) {
                res.status(400).send({ err: err.message });
            }

            res.status(400).json({ message: "Wrong password" });
        });
    } catch (err) {
        res.status(400).send({ err: err.message });
    }
});
// Getting user by _id
userRouter.get("/:id", async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports=userRouter
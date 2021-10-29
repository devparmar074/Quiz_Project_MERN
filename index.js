import express from "express";
import cors from "cors";
import mongoose from "mongoose";

    const app = express();
    app.use(express.json())
    app.use(express.urlencoded())
    app.use(cors())

    mongoose.connect("mongodb://localhost:27017/myquiz",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, ()=> {
        console.log("DB connected")
    })


    const userSchema = mongoose.Schema({
        name: String,
        email: String,
        password: String

    })

    const User = new mongoose.model("User",userSchema)


//Routes
    app.post("/Login", (req,res)=> {
        const { email, password} = req.body
        User.findOne({email: email}, (err, user) => {
            if(user){
                if(password === user.password) {
                    res.send({ message: "Login SuccessFully", user: user})
                }
                else{
                    res.send({ message: "Password didnot Match!"})
                }
            }else{
                res.send({message:"User not Registerd"})
            }
        })
    })

    app.post("/Register", (req,res)=> {
        const { name, email, password} = req.body
        User.findOne({email: email}, (err, user) => {
            if(user){
                res.send({ message: "user Already Registerd"})
            }
            else{
                const user = new User({
                    name,
                    email,
                    password
                })
                user.save( err => {
                    if(err){
                        res.send(err)
                    }
                    else{
                        res.send({ message: "Successfully Registerd , Please Login"  })
                    }
                })
            }
        })
        
    })


    app.listen(9002,()=> {
        console.log("BE started at port 9002")
    })
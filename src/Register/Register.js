import React,{ useState } from 'react';
import "./Register.css"
import axios from "axios"
import {useHistory} from "react-router-dom"

const Register = () => {
    const history = useHistory()

    const [user,setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
    })

    const handleChange = e => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const Register = () => {
        const { name, email, password, reEnterPassword } = user
        if(name && email && password &&(password === reEnterPassword)){
            //alert("Posted")
            axios.post("http://localhost:9002/Register", user)
            .then( res => { 
                alert(res.data.message)
                history.push("/Login")
                
            })


        }else{
            alert("invalid Input")
        }
        
    }

    return(
        <div className="Register">
        {console.log("user",user)}
        <h1>Registration</h1>
        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange}></input>
        <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange}></input>
        <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange}></input>
        <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-Enter Password" onChange={ handleChange}></input>
        <div classname="button" id="buttonL" onClick={Register}>Register</div>
        <div>or</div>
        <div classname="button" id="buttonR" onClick={()=> history.push("/Login")} >Login</div>
        </div>
    )
}
export default Register
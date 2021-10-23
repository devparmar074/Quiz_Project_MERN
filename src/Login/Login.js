import React, { useState} from 'react';
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setLoginUser }) => {

    const history = useHistory()

    const [user,setUser] = useState({
        
        email: "",
        password: "",
        
    })

    const handleChange = e => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const Login = () => {
        axios.post("http://localhost:9002/Login",user)
        .then(res => {
        alert(res.data.message)
        setLoginUser(res.data.user)
        history.push("/question")
        })
    }




    return(
        <div className="Login">
        
        <h1>Login</h1>
        <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
        <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password"></input>
        <div classname="button" id="buttonL" onClick={Login}>Login</div>
        <div>or</div>
        <div classname="button" id="buttonR" onClick={()=> history.push("/Register")} >Register</div>
        </div>
    )
}
export default Login
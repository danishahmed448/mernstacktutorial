import { useState,useContext } from "react";
import "./login.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";


const Login = () => {
    const {isFetching,dispatch} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin  = (e)=>{
        e.preventDefault();
        login({email,password},dispatch)
    }
  return (
    <div className="login">
        <form className="loginForm">
            <input type="email" placeholder="Email" 
            value={email} className="loginInput" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" className="loginInput"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
            >Login</button>
        </form>
    </div>
  )
}

export default Login
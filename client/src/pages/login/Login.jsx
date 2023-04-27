import { useContext } from "react";
import "./login.scss";
import {AuthContext} from '../../authContext/AuthContext';
import { useState } from "react";
import {login} from '../../authContext/apiCalls';
const Login = () => {
    const {dispatch} = useContext(AuthContext);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleSubmit = async(e)=>{
        e.preventDefault();
        login({email,password},dispatch);
    }
    return (
        <div className="login">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src="/Images/Branding/anyflix_logo.png" alt="anyflix_logo"/>
                </div>
            </div>
            <div className="container">
                <form>
                    <h1>Sign In</h1>
                    <input type="email" placeholder="Email or phone number" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    <button className="loginButton" onClick={handleSubmit}>
                        Sign In
                    </button>
                    <span>New to Anyflix? <b>Sign up now.</b></span>
                    <small>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>
                    </small>
                </form>
            </div>
        </div>
    )
}

export default Login
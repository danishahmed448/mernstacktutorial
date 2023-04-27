import { useRef, useState } from "react";
import "./register.scss";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { axiosInstance } from "../../axiosInstance/axiosInstance";

const Register = () => {

    const [email, setEmail] = useState("");
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();
    const history = useHistory();
    const handleStart = () => {
        setEmail(emailRef.current.value);
    }
    const handleFinish = async (e) => {
        e.preventDefault();
        const password=passwordRef.current.value;
        const username=usernameRef.current.value;
        try {
            
            await axiosInstance.post('auth/register', { email:email, password:password,username:username });
            history.push('/login')
        } catch (error) {
            console.log(error.message)
        }

    }
    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src="/Images/Branding/anyflix_logo.png" alt="anyflix_log" />
                  
                    <button className="loginButton" onClick={()=>history.push('/login')}>
                        Sign In
                    </button>
                
                </div>
            </div>
            <div className="container">
                <h1>Watch Unlimited Adult Movies and TV Shows on Anyflix</h1>
                <h2>Stream Anywhere, Cancel Anytime</h2>
                <p>
                    Get ready to explore a world of erotic entertainment with Anyflix. Enter your email to create or restart your membership today.
                </p>
                {!email ? (
                    <div className="input">
                        <input type="email" placeholder="Email address"
                            ref={emailRef}
                        ></input>
                        <button className="registerButton"
                            onClick={handleStart}
                        >
                            Get started
                        </button>
                    </div>

                ) : (
                    <form className="input">
                        <input type="text" placeholder="Username"
                            ref={usernameRef}
                        ></input>
                        <input type="password" placeholder="Password"
                            ref={passwordRef}
                        ></input>
                        <button className="registerButton"
                            onClick={handleFinish}
                        >
                            Start
                        </button>
                    </form>

                )}

            </div>
        </div>
    )
}

export default Register
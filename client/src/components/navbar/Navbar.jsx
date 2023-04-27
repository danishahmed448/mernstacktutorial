import { useState, useEffect, useRef } from "react";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import "./navbar.scss";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/apiCalls";
import axios from "axios";
import { useSearch } from "../../searchContext/SearchContext";
import { axiosInstance } from "../../axiosInstance/axiosInstance";

const Navbar = ({setSuggestions,query,setQuery,setGenre}) => {
    const { dispatch } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const {showSearchInput, setShowSearchInput} = useSearch()
    const inputRef = useRef(null);
    const history = useHistory();
    const handleInputChange = async (event) => {
        const value = event.target.value;
        setQuery(value);
        if (value.length > 0) {
            const response = await axiosInstance.get(`/movies/search/keywords/${value}`, {
                headers: {
                    token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
                }
            });
            setSuggestions(response.data);
        } else {
            setSuggestions([]);
        }
    };
    useEffect(() => {
        window.onscroll = () => {
            setIsScrolled(window.pageYOffset === 0 ? false : true)
        };
        return () => (window.onscroll = null);
    }, []);
    useEffect(() => {
        if (showSearchInput) {
            inputRef.current.focus();
        }
    }, [showSearchInput]);
    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="/Images/Branding/anyflix_logo.png"
                        alt="anyflix logo"
                    />
                    <div className="link" onClick={()=>{
                        setGenre("");
                        setQuery("");
                        setSuggestions([]);
                        history.push('/movies')
                    }}>
                        <span className="navbarMaiLinks">Movies</span>
                    </div>
                    <Link to="/" className="link">
                        <span>New and Popular</span>
                    </Link>
                    <Link to="/" className="link">
                        <span>My List</span>
                    </Link>
                </div>
                <div className="right">
                    <div className={`searchBox ${showSearchInput ? 'showSearch' : ''}`}>
                        <Search className="icon searchIcon " onClick={() => {
                            setShowSearchInput((prev) => !prev)
                        }} />
                        <input ref={inputRef} type="text" className={`searchInput`} value={query} onChange={handleInputChange} />
                    </div>
                    <img src="/Images/Avatars/Avatar_01.png" alt="user_profile_pic" />
                    <div className="profile">
                        <ArrowDropDown className="icon" />
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={() => { logout(dispatch); history.push('/') }}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
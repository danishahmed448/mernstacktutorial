import "./widgetSm.css";
import { useState, useEffect } from 'react';
import { Visibility } from '@material-ui/icons';
import axios from 'axios'
import { axiosInstance } from "../../axiosInstance/axiosInstance";
const WidgetSm = () => {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axiosInstance.get("/users/?new=true", {
                    headers: {
                        token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
                    }
                })
                setNewUsers(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getNewUsers();
    }, [])


    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Members</span>
            <ul className="widgetSmList">
                {newUsers.map((user)=>
                <li key={user._id} className="widgetSmListItem">
                    <img src={user.profilePic || "/Images/Avatars/Avatar_01.png"} alt="new member avatar" className="widgetSmImg" />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.username}</span>
                        {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon" />
                        Display
                    </button>
                </li>)}
                

            </ul>
        </div>
    )
}

export default WidgetSm
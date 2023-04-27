import { InfoOutlined, PlayArrow, VolumeUpOutlined, VolumeOffOutlined, Close } from "@material-ui/icons";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { createRef } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance/axiosInstance";

const Featured = ({ type, setGenre }) => {
    const [content, setContent] = useState({});
    const [isHovered, setIsHovered] = useState(false);
    const [isMuted, setisMuted] = useState(true);
    const [isHoveredModal, setIsHoveredModal] = useState(false);
    const [isMutedModal, setisMutedModal] = useState(true);
    const [showModal, setshowModal] = useState(false);
    const videoRef = useRef(null);
    const videoRefModal = useRef(null);

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axiosInstance.get(`/movies/random?type=${type}`, {
                    headers: {
                        token: `Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
                    },
                })

                setContent(res.data[0]);

            } catch (error) {
                console.log(error);
            }
        }
        getRandomContent();
    }, [type])




    return (
        <div className="featured" onMouseEnter={() => {
            setIsHovered(true)
            videoRef.current.play();
        }}
            onMouseLeave={() => {
                setIsHovered(false)
                videoRef.current.pause();
            }}
            onTouchStart={() => {
                setIsHovered(true)
                videoRef.current.play();
            }}
            onTouchEnd={() => {
                setIsHovered(false)
                videoRef.current.pause();
            }}
        >
            {type && (
                <div className="category">
                    <span>{type === "series" ? "Series" : "Movies"}</span>
                    <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="tango">Tango</option>
                        <option value="onlyfans">Onlyfans</option>
                    </select>
                </div>
            )}
            <div className="media-container">

                <img src={content.img} alt="featured_movie_poster" style={{ opacity: isHovered ? 0 : 1 }} />
                
                <video ref={videoRef}
                    src={content.trailer}
                    autoPlay={true}
                    loop
                    playsInline
                    muted={isMuted}
                    style={{ opacity: isHovered ? 1 : 0 }} />
            </div>
            <div className="info">
                <img
                    src={content.imgTitle}
                    alt="featured_movie_logo"
                />
                <span className="desc">
                    {content.desc}
                </span>
                <div className="buttons">
                    <Link to={{ pathname: "/watch", movie: content }} className="link">
                        <button className="play">

                            <PlayArrow />
                            <span>Play</span>
                        </button>
                    </Link>
                    <button className="more" onClick={() => { setshowModal((prev) => !prev) }}>
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
            <div className="info_right">
                <button className="rounded_button" onClick={() => setisMuted((prev) => !prev)}>
                    {isMuted ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
                </button>
            </div>
            {showModal &&
                <div className="modal" onMouseEnter={() => {
                    setIsHoveredModal(true)
                    videoRefModal.current.play();
                }}
                    onMouseLeave={() => {
                        setIsHoveredModal(false)
                        videoRefModal.current.pause();
                    }}
                    onTouchStart={() => {
                        setIsHoveredModal(true)
                        videoRefModal.current.play();
                    }}
                    onTouchEnd={() => {
                        setIsHoveredModal(false)
                        videoRefModal.current.pause();
                    }}>
                    <div className="modal_media-container">
                        <img src={content.img} alt="featured_movie_poster" style={{ opacity: isHoveredModal ? 0 : 1 }} />
                        <video ref={videoRefModal}
                            src={content.trailer}
                            autoPlay={true}
                            loop
                            playsInline
                            muted={isMutedModal}
                            style={{ opacity: isHovered ? 1 : 0 }} />
                    </div>
                    <div className="info">
                        <div className="buttons">
                            <Link to={{ pathname: "/watch", movie: content }} className="link">
                                <button className="play">
                                    <PlayArrow />
                                    <span>Play</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="info_right">
                        <button className="rounded_button" onClick={() => setisMutedModal((prev) => !prev)}>
                            {isMutedModal ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
                        </button>
                    </div>
                    <div className="info_top">
                        <button className="rounded_button" onClick={() => setshowModal((prev) => !prev)}>
                            <Close />
                        </button>
                    </div>
                    <div className="details">
                        <div className="details_left">
                            <div className="details_left_item">
                                <div className="details_left_item_sub">
                                    {content.duration}
                                </div>
                                <div className="details_left_item_sub limit">
                                    +{content.limit}
                                </div>
                                <div className="details_left_item_sub">
                                    {content.year}
                                </div>
                            </div>
                            <div className="details_left_item">
                                <h3>{content.title}</h3>
                            </div>
                            <div className="details_left_item">
                                {content.desc} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos id est, velit ipsa modi laudantium officiis perspiciatis, temporibus iste quisquam porro iure tempore dolore voluptas obcaecati magnam. Aut, voluptatibus? Pariatur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque perspiciatis, velit aut similique sapiente cupiditate. Error reprehenderit voluptatum dolorum voluptates numquam? Optio quasi dolore autem ut corporis suscipit, sapiente ipsa.
                            </div>
                        </div>
                        <div className="details_right">
                            <div className="details_right_item">
                                <span className="details_right_item_heading">Total likes:</span>
                                {content.likes.length} likes
                            </div>
                            <div className="details_right_item">
                                <span className="details_right_item_heading">Genres:</span>
                                {content.genre.replace(/^\w/, (c) => c.toUpperCase())}
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Featured
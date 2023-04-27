import { Add, Favorite, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined, VolumeOffOutlined, VolumeUpOutlined } from "@material-ui/icons";
import "./listItem.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AuthContext } from "../../authContext/AuthContext";
import { dislikeaMovie, likeaMovie } from "../../authContext/apiCalls";
import { axiosInstance } from "../../axiosInstance/axiosInstance";

const ListItem = ({ index, item,search }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [isMuted, setisMuted] = useState(true);
  const {user,dispatch} = useContext(AuthContext);
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel;
    const getMovie = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/movies/find/${item}`, {
          headers: {
            token:`Bearer ${JSON.parse(localStorage.getItem("user")).accessToken}`
          },
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          })
        });
        setMovie(res.data);
        setLoading(false);

      } catch (error) {
        console.log(error)
      }
    }
    getMovie();
    return () => {
      cancel(); // cancel the request if it is still running
    };
  }, [item])
  if (loading) {
    return <div className="listItem">
      <Skeleton className="listItem" baseColor="#202020" highlightColor="#444" />
    </div>;
  }
  const handleFavorite = ()=>{
    const liked = user.favorites.includes(movie._id);
    console.log(liked)
    if(liked){
      dislikeaMovie(movie._id,dispatch);
    }else{
          likeaMovie(movie._id,dispatch);
    }
  }
  return movie ? (

    <div className={`listItem ${search? 'searchListItem':''}`}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
       <Link to={{ pathname: "/watch", movie: movie }} className="link">
      <img src={movie?.img} alt={`${movie.title}_poster`} />

       </Link>
      {isHovered && !isTouchDevice() && !search && (
        <>
          <Link to={{ pathname: "/watch", movie: movie }} className="link">
            <video playsInline muted={isMuted} src={movie.trailer} autoPlay={true} loop />
          </Link>
          <div className="info_right">
            <button className="rounded_button" onClick={() => setisMuted((prev) => !prev)}>
              {isMuted ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
            </button>
          </div>
          <div className="itemInfo">
            <div className="icons">
              <Link to={{ pathname: "/watch", movie: movie }} className="link">
                <PlayArrow className="icon" />
              </Link>
              <Favorite className={`icon ${user.favorites.includes(movie._id) ?'liked':''}`} onClick={handleFavorite}/>
              <span className="likes">{movie.likes.length}</span>
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}

    </div>

  ) : <></>
}

export default ListItem;
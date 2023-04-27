import { ArrowBackOutlined } from "@material-ui/icons"
import "./watch.scss";
import { useLocation, Link, useHistory } from "react-router-dom";
import { useEffect } from 'react';

const Watch = () => {
  const history = useHistory();
  const location = useLocation();
  const movie = location.movie;
  useEffect(() => {
    if (!movie || !movie.video) {
      history.push("/");
    }
  }, [movie, history]);

  return (
    <div className="watch">

      <div className="back" onClick={() => history.goBack()}>
        <ArrowBackOutlined />
        Home
      </div>

      {movie && movie.video && (
        <video
          className="video"
          autoPlay
          progress="true"
          controls
          src={movie.video}
        />
      )}
    </div>
  )
}

export default Watch
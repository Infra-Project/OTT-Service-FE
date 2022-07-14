import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  Timelapse,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [signedUrl, setSignedUrl] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          "https://dev.theotters.net/movies/find/" + item.movieId,
          {
            headers: {
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            },
          }
        );
        // console.log("*********", res.data.movie);
        setMovie(res.data.movie);
        getMovie();

        const getSignedUrl = async () => {
          try{
            const resp  = await axios.get(
              `https://dev.theotters.net/signedUrl/?movieId=${item.movieId}${ item.isSeries ? "&episodeId="+ item.episodeId : ""}`,{
              headers: {
                Authorization:
                  "Bearer " + JSON.parse(localStorage.getItem("user")).token,
              }
            });
            console.log("*** resp.config.url ***: ", resp.config.url);
            setSignedUrl(resp.config.url);
            console.log("*** signedUrl ***: ", signedUrl);
          } catch (err) {
            console.log(err);
          }
          
        };
        getSignedUrl();

      } catch (err) {
        console.log(err);
      }
    };

  }, [item]);

  return (
    <Link to={ {pathname: "/watch", movie: signedUrl, } } >
      <div
        className="listItem"
        style={{ left: isHovered && index * 330 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={item?.thumbnail} alt="" />
        {isHovered && (
          <>
            <video src={item.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span> {item.title} &nbsp; </span> <span> | &nbsp; </span>
                <Timelapse className="icon" />
                <span> {item.duration} </span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{item.epi_info}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
     </Link>
  );
}

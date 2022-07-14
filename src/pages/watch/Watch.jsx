import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const signedUrl = location.signedUrl;
  console.log(" *** location *** ", location);
  console.log(" *** location.signedUrl *** ", location.signedUrl);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={signedUrl} />
    </div>
  );
}

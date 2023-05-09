import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [pageUser, setPageUser] = useState({});
  const username = useParams().username;
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
      setPageUser(res.data);
    };
    fetchUser();
  }, [username]);

  useEffect(() => {
    if (Object.keys(pageUser).length > 0) {
      setIsLoaded(true);
    }
  }, [pageUser]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  pageUser.coverPicture
                    ? PF + pageUser.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  pageUser.profilePicture
                    ? PF + pageUser.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{pageUser.username}</h4>
              <span className="profileInfoDesc">{pageUser.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            {isLoaded && <Rightbar user={pageUser} />}
          </div>
        </div>
      </div>
    </>
  );
}

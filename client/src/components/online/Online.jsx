import "./online.css";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        {user.profilePicture 
        ? <img className="rightbarProfileImg" src={PF + user.profilePicture} alt="" /> 
        : <img className="rightbarProfileImg" src={PF + "person/noAvatar.png"} alt="" /> 
        }
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}

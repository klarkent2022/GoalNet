import { useState } from 'react';
import "./sidebar.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import Diversity3Icon from '@mui/icons-material/Diversity3';

import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  const [showsMore, setShowsMore] = useState(false);

  const handleShowsMoreClick = () => {
    setShowsMore(true);
  };
  
  const handleShowsLessClick = () => {
    setShowsMore(false);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Friends</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Diversity3Icon className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          {showsMore && (
            <>
              <li className="sidebarListItem">
                <HelpOutlineIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Questions</span>
              </li>
              <li className="sidebarListItem">
                <WorkOutlineIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Jobs</span>
              </li>
              <li className="sidebarListItem">
                <EventIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Events</span>
              </li>
              <li className="sidebarListItem">
                <SchoolIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Courses</span>
              </li>
            </>
          )}
        </ul>
        <button className="sidebarButton" onClick={!showsMore ? handleShowsMoreClick : handleShowsLessClick}>
          {!showsMore ?  "Show More" : "Show Less"}
        </button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

import React from 'react';
import "./UserInfo.css";
import {useUserStore } from '../../../lib/userStore';

export default function UserInfo() {

  const {currentUser}=useUserStore();
  return (
    
   <div className="userInfo">
    <div className="user">
        <img src={ currentUser.avatar  || "./avatar.png"} alt="" />
        <h1>{currentUser.username }</h1>
    </div>
    <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
    </div>
   </div>
    
  )
}

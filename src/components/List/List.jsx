import React from 'react'
import "./List.css"
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'

export default function List() {
  return (
    <div>
      <UserInfo/>
      <ChatList/>
    </div>
  )
}

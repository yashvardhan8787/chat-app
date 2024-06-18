import Details from  "./components/Details/Details" ;
import Chat from "./components/Chat/Chat" ;
import List from "./components/List/List";
import Login from "./components/login/Login";
import './index.css';
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";
const App = () => {
  
  

  const {currentUser, isLoading , fetchUserInfo} = useUserStore();
  const {chatId} = useChatStore();
  useEffect(()=>{
  const unSub= onAuthStateChanged(auth,(user)=>{
    fetchUserInfo(user?.uid);
  });

  return ()=>{
    unSub();
  };
  },[ fetchUserInfo]);

  if (isLoading) return <div className="loading">loading.....</div>
  return (
    <div className='container'>
      {currentUser ? (
         <>
         <List/>
         {chatId && <Chat/>}
         {chatId && <Details/>}
        
         </>
      
      ):(
        
        <Login/>
  
      )}

      <Notification />
    </div>
  )
}

export default App 
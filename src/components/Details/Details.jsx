
import { arrayRemove, arrayUnion, doc, updateDoc   } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./Details.css";
import { db } from "../../lib/firebase";
const Details = () => {


  const {chatId, user, isCurrentUserBlocked ,isRecieverBlocked ,changeBlock }=useChatStore();
  const {currentUser}= useUserStore();
  const handleLogout=()=>{
  auth.signOut();
 };


 const handleBlock= async ()=>{
  const userDocRef = doc(db, "users", currentUser.id);

 try {
   await updateDoc(userDocRef,{
      blocked: isRecieverBlocked  ? arrayRemove(user.id ):arrayUnion(user.id),
   });
   changeBlock();
 } catch (error) {
   console.log(error);
 }
 }
  
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar ||"./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>{
         isCurrentUserBlocked ?" you are blocked "
        :isRecieverBlocked ? "user is blocked "
         :"hii!! ,"+user.username+" is here "
         }</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button  onClick={handleBlock}>
        {isCurrentUserBlocked ?" you are blocked ":isRecieverBlocked ? "user blocked " :"Block User"}
        </button>
        <button className="logout"   onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Details;
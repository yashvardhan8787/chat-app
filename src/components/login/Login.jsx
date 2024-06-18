import React, { useState } from "react";
import "./Login.css"
import { toast } from "react-toastify";
import {auth ,db } from "../../lib/firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {doc ,setDoc} from "firebase/firestore";
import uploads from "../../lib/uploads";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  
  const [loading ,setLoading ]=useState(false);
  const handelAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegistration = async(e)=>{
    e.preventDefault()
    setLoading(true);
    const formData=new FormData(e.target);
    const {username,email, password}=Object.fromEntries(formData);
    try {
      const res =await  createUserWithEmailAndPassword(auth,email,password);
      
      const imgUrl = await uploads(avatar.file)
      
      
      await setDoc(doc(db,"users",res.user.uid),{
       username,
       email,
       avatar:imgUrl,
       id:res.user.uid,
       blocked:[] , 
      });

      await setDoc(doc(db,"userchats",res.user.uid),{
        chats:[],
      });

      toast.success("Account created Sucessfully, You can login now!!");
    } catch (err) {
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  };


  const handleLogin =async (e)=>{
    e.preventDefault()
    const formData=new FormData(e.target);
    const {email, password}=Object.fromEntries(formData);

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth,email,password);
      toast.success("you are logged in ");
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }finally{
     setLoading(false);
    }
  };


  return (
    <div className="login">
      <div className="item">
        <h2>Login your Account.</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button disabled={loading}>{loading? "loading" :" Sign In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create your account</h2>
        <form action=""  onSubmit={handleRegistration}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload your image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handelAvatar}
          />
          <input type="text" placeholder="username" name="username" />
          <input type="text" placeholder="emial" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button disabled={loading}>{loading? "loading" :" Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

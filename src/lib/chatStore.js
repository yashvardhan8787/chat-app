import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import {useUserStore} from "./userStore.js";

export const useChatStore = create((set) => ({
 chatId :null,
 user: null,
 isCurrentUserBlocked:false,
 isRecieverBlocked:false,
 changeChat:(chatId,user)=>{
    const currentUser = useUserStore.getState().currentUser;
   //check user is blocked 
   if (user.blocked.includes(currentUser.id)){
    return set({
        chatId ,
        user: null,
        isCurrentUserBlocked:true,
        isRecieverBlocked:false,
    });
   }
   //check recievr is blocked 
   else if (currentUser.blocked.includes(user.id)){
    return set({
        chatId ,
        user: user,
        isCurrentUserBlocked:false,
        isRecieverBlocked:true,
    });
   }else{
    return set({
        chatId ,
        user,
        isCurrentUserBlocked:false,
        isRecieverBlocked:false,
    });

   }
 },

 changeBlock:()=>{
    set((state)=>({...state,isReceiverBlocked:!state.isReceiverBlocked}));
 },


}));
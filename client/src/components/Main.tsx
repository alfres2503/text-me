import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import ChatList from "./ChatList/ChatList";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import Chat from "./Chat/Chat";

const Main = () => {
  const router = useRouter();
  const [redirectLogin, setRedirectLogin] = useState<boolean>(false);

  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider() as any;

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(firebaseAuth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);

    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });

      if (!data.status) {
        router.push("/login");
      }

      console.log(data);
      if (data?.data) {
        const {
          id,
          name,
          email,
          profilePictureUrl: profileImage,
          status,
        } = data.data;
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            id,
            name,
            email,
            profileImage,
            status,
          },
        });
      }
    }
  });

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        {currentChatUser ? <Chat /> : <Empty></Empty>}
        <ChatList></ChatList>
      </div>
    </>
  );
};

export default Main;

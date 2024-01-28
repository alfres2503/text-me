import React, { useEffect, useRef, useState } from "react";
import Empty from "./Empty";
import ChatList from "./ChatList/ChatList";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import {
  CHECK_USER_ROUTE,
  GET_INITIAL_CONTACTS_ROUTE,
  GET_MESSAGES_ROUTE,
  HOST,
} from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import SearchMessages from "./Chat/SearchMessages";

const Main = () => {
  const router = useRouter();

  const [redirectLogin, setRedirectLogin] = useState<boolean>(false);
  const [{ userInfo, currentChatUser, messagesSearch }, dispatch] =
    useStateProvider() as any;
  const [socketEvent, setSocketEvent] = useState(false);
  const socket = useRef<any>(null);

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

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo.id);
      dispatch({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [userInfo]);

  useEffect(() => {
    const updateContacts = async () => {
      const {
        data: { users },
      } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);

      dispatch({ type: reducerCases.SET_USER_CONTACTS, users });
    };

    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data: any) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });

        updateContacts();
        console.log("mensaje recibido");
      });
      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );
      dispatch({ type: reducerCases.SET_MESSAGES, messages });
    };

    if (currentChatUser?.id && userInfo?.id) {
      getMessages();
    }
  }, [currentChatUser]);

  return (
    <>
      <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
        {currentChatUser ? (
          <div className={messagesSearch ? "grid grid-cols-2" : "grid-cols-2"}>
            {messagesSearch && <SearchMessages />}
            <Chat />
          </div>
        ) : (
          <Empty></Empty>
        )}
        <ChatList></ChatList>
      </div>
    </>
  );
};

export default Main;

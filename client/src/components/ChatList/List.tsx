import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { GET_INITIAL_CONTACTS_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import React, { useEffect } from "react";
import ChatListItem from "./ChatListItem";

const List = () => {
  const [{ userInfo, userContacts, filteredContacts }, dispatch] =
    useStateProvider() as any;

  useEffect(() => {
    const getContacts = async () => {
      try {
        const {
          data: { users, onlineUsers },
        } = await axios(`${GET_INITIAL_CONTACTS_ROUTE}/${userInfo.id}`);

        dispatch({ type: reducerCases.SET_ONLINE_USERS, onlineUsers });
        dispatch({ type: reducerCases.SET_USER_CONTACTS, users });
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo?.id) getContacts();

    console.log("userContacts", userContacts);
  }, [userInfo]);

  return (
    <div className="bg-zinc-950  flex-auto overflow-auto max-h-full custom-scrollbar">
      {filteredContacts && filteredContacts.length > 0
        ? filteredContacts?.map((contact) => (
            <ChatListItem key={contact.id} data={contact} />
          ))
        : userContacts?.map((contact) => (
            <ChatListItem key={contact.id} data={contact} />
          ))}
      {}
    </div>
  );
};

export default List;

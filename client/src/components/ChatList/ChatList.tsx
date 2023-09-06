import React, { useEffect, useState } from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";
import { useStateProvider } from "@/context/StateContext";
import ContactsList from "./ContactsList";

const ChatList = () => {
  const [{ contactsPage }] = useStateProvider() as any;
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) setPageType("all-contacts");
    else setPageType("default");
  }, [contactsPage]);

  return (
    <div className="bg-zinc-950 border-l border-l-zinc-600 flex flex-col max-h-screen ">
      {pageType === "default" && (
        <>
          <ChatListHeader></ChatListHeader>
          <SearchBar></SearchBar>
          <List></List>
        </>
      )}
      {pageType === "all-contacts" && <ContactsList />}
    </div>
  );
};

export default ChatList;

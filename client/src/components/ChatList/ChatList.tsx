import React from "react";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List";

const ChatList = () => {
  return (
    <div className="bg-zinc-950 border-l border-l-zinc-600 flex flex-col max-h-screen ">
      <>
        <ChatListHeader></ChatListHeader>
        <SearchBar></SearchBar>
        <List></List>
      </>
    </div>
  );
};

export default ChatList;

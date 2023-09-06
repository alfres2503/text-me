import React from "react";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageBar from "./MessageBar";
import ChatContainer from "./ChatContainer";

const Chat = () => {
  return (
    <div className="border-zinc-700 border-l w-full bg-zinc-950 flex flex-col h-[100vh] z-10">
      <ChatHeader />
      <ChatContainer />
      <MessageBar />
    </div>
  );
};

export default Chat;

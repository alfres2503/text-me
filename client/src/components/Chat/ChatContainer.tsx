import { useStateProvider } from "@/context/StateContext";
import React from "react";
import MessageStatus from "../common/MessageStatus";
import ImageMessage from "./ImageMessage";

const ChatContainer = () => {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider() as any;

  return (
    <div className="h-[80vh] px-2 w-full relative flex-grow overflow-auto custom-scrollbar">
      {/* este div debería tener las clases h-full w-full pero esto genera problemas */}
      <div className="bg-zinc-950 bg-fixed w-full  h-full  left-0 top-0">
        <div className="flex w-full">
          <div className="flex flex-col pt-4 w-full gap-1 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentChatUser.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.type === "text" && (
                  <div
                    className={`text-white py-2 px-3 text-md rounded-2xl flex gap-2 items-end max-w-[45%] ${
                      message.senderId === currentChatUser.id
                        ? "bg-zinc-700"
                        : "bg-blue-700"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                    <div className="flex gap-1 items-end">
                      {/* <span className="text-zinc-400 text-[11px] pt-1 min-w-fit">
                        {message.createdAt}
                      </span> */}
                      <span>
                        {message.senderId === userInfo.id && (
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        )}
                      </span>
                      <span className="text-zinc-300 text-xs">
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )}
                {message.type === "image" && <ImageMessage message={message} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;

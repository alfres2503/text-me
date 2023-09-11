import { useStateProvider } from "@/context/StateContext";
import React from "react";
import Image from "next/image";
import { HOST } from "@/utils/ApiRoutes";
import MessageStatus from "../common/MessageStatus";

const ImageMessage = ({ message }) => {
  const [{ currentChatUser, userInfo }] = useStateProvider() as any;

  return (
    <div
      className={`p-1 rounded-lg ${
        message.senderId === currentChatUser.id ? "bg-zinc-700" : "bg-blue-700"
      }`}
    >
      <div className="relative">
        <Image
          src={`${HOST}/${message.message}`}
          className="rounded-lg"
          alt="asset"
          width={300}
          height={300}
        />
        <div className="absolute bottom-1 right-1 flex items-end gap-1">
          <span className="text-zinc-300">
            {message.senderId === userInfo.id && (
              <MessageStatus messageStatus={message.messageStatus} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageMessage;

import React, { useEffect } from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

const ChatHeader = () => {
  const [{ currentChatUser }, dispatch] = useStateProvider() as any;

  useEffect(() => {
    console.log(currentChatUser);
  }, []);

  return (
    <div className="h-16 px-4 py-3 flex  justify-between items-center bg-zinc-950 z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar
          type="sm"
          image={currentChatUser?.profilePictureUrl}
          setImage={() => {}}
        />
        <div className="flex flex-col">
          <span className="text-white ">{currentChatUser?.name}</span>
          <span className="text-zinc-300 text-sm">Online/Offline</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-zinc-300 cursor-pointer text-xl" />
        <IoVideocam className="text-zinc-300 cursor-pointer text-xl" />
        <BiSearchAlt2
          className="text-zinc-300 cursor-pointer text-xl"
          onClick={() => {
            dispatch({ type: reducerCases.SET_MESSAGE_SEARCH });
          }}
        />
        <BsThreeDotsVertical className="text-zinc-300 cursor-pointer text-xl" />
      </div>
    </div>
  );
};

export default ChatHeader;

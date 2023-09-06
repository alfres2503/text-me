import React from "react";
import Avatar from "../common/Avatar";
import { MdCall } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const ChatHeader = () => {
  return (
    <div className="h-16 px-4 py-3 flex  justify-between items-center bg-zinc-950 z-10">
      <div className="flex items-center justify-center gap-6">
        <Avatar type="sm" image={"/profile"} setImage={() => {}} />
        <div className="flex flex-col">
          <span className="text-white ">DEMO</span>
          <span className="text-zinc-300 text-sm">Online/Offline</span>
        </div>
      </div>
      <div className="flex gap-6">
        <MdCall className="text-zinc-300 cursor-pointer text-xl" />
        <IoVideocam className="text-zinc-300 cursor-pointer text-xl" />
        <BiSearchAlt2 className="text-zinc-300 cursor-pointer text-xl" />
        <BsThreeDotsVertical className="text-zinc-300 cursor-pointer text-xl" />
      </div>
    </div>
  );
};

export default ChatHeader;

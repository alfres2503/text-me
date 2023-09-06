import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

const MessageBar = () => {
  return (
    <div className="bg-zinc-950 h-20 px-4 flex items-center gap-6 relative ">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-zinc-600 cursor-pointer text-xl"
            title="Emoji"
          />
          <ImAttachment
            className="text-zinc-600 cursor-pointer text-xl"
            title="Attachment"
          />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <input
            type="text"
            placeholder="Text Message"
            className="bg-zinc-950 border border-zinc-600 text-sm focus:outline-none text-white h-10 rounded-full px-5 py-4 w-full"
          />
        </div>
        <div className="flex w-10 items-center justify-center">
          <button>
            <MdSend
              className="text-zinc-400 cursor-pointer text-xl"
              title="Record"
            />
            {/* <FaMicrophone
              className="text-zinc-400 cursor-pointer text-xl"
              title="Send"
            /> */}
          </button>
        </div>
      </>
    </div>
  );
};

export default MessageBar;

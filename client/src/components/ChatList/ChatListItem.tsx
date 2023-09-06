import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

const ChatListItem = ({ data, isContactPage = false }) => {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider() as any;

  const handleContactClick = () => {
    // if (currentChatUser?.id === data?.id) {
    dispatch({
      type: reducerCases.CHANGE_CURRENT_CHAT_USER,
      user: { ...data },
    });
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    // }
  };

  return (
    <div
      className="flex cursor-pointer items-center hover:bg-zinc-900"
      onClick={handleContactClick}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar type="lg" image={data?.profilePictureUrl} setImage={() => {}} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full ">
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
        </div>
        <div className="flex border-b border-b-zinc-700 pb-2 pt-1 p3-2">
          <div className="flex justify-between w-full">
            <span className="text-zinc-400 line-clamp-1 text-sm">
              {data?.about || "\u00A0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;

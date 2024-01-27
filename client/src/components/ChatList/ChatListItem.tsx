import React, { useEffect } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import MessageStatus from "../common/MessageStatus";
import { FaCamera, FaMicrophone } from "react-icons/fa";

const ChatListItem = ({ data, isContactPage = false }) => {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider() as any;

  const handleContactClick = () => {
    // if (currentChatUser?.id === data?.id) {
    if (!isContactPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePictureUrl: data.profilePictureUrl,
          email: data.email,
          id: userInfo.id === data.senderId ? data.receiverId : data.senderId,
        },
      });
    } else {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: { ...data },
      });
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
    // }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime =
      hours + ":" + minutes + " " + ampm + " " + date.toLocaleDateString();
    return formattedTime;
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
            <span
              className={`${
                data.totalUnreadMessages > 0
                  ? "font-bold text-white"
                  : "text-white"
              }`}
            >
              {data?.name}
            </span>
          </div>
          {!isContactPage && (
            <div>
              <span
                className={`${
                  data.totalUnreadMessages > 0
                    ? "text-blue-400"
                    : "text-zinc-400"
                } text-xs`}
              >
                {formatTime(data.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className="flex border-b border-b-zinc-700 pb-2 pt-1 p3-2">
          <div className="flex justify-between w-full">
            <span className="text-zinc-400 line-clamp-1 text-sm">
              {isContactPage ? (
                data?.about || "\u00A0"
              ) : (
                <div className="flex items-center gap-1 wax-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px]">
                  {data.senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span className="truncate">{data.message}</span>
                  )}
                  {data.type === "image" && (
                    <span className="flex gap-1 items-center">
                      <FaCamera className="text-zinc-400" />
                    </span>
                  )}
                  {data.type === "audio" && (
                    <span className="flex gap-1 items-center">
                      <FaMicrophone className="text-zinc-400" />
                      Voice Message
                    </span>
                  )}
                </div>
              )}
            </span>
            {data.totalUnreadMessages > 0 && (
              <span className="bg-blue-400 px-[5px] rounded-full text-sm">
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;

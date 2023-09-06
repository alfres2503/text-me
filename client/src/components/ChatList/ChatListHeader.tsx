import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "@/context/constants";

const ChatListHeader = () => {
  const [{ userInfo }, dispatch] = useStateProvider() as any;

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer ">
        <Avatar type="sm" image={userInfo?.profileImage} setImage={() => {}} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-white cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactsPage}
        />
        <>
          <BsThreeDotsVertical
            className="text-white cursor-pointer text-xl"
            title="Menu"
          />
        </>
      </div>
    </div>
  );
};

export default ChatListHeader;

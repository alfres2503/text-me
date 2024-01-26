import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const SearchMessages = () => {
  const [{ currentChatUser, messages }, dispatch] = useStateProvider() as any;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMessages, setSearchedMessages] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setSearchedMessages(
        messages.filter(
          (message) =>
            message.type === "text" &&
            message.message.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setSearchedMessages([]);
    }
  }, [searchTerm]);

  const formatTime = (dateParam: any) => {
    //convert date parameter to date object
    const date = new Date(dateParam);

    // return date in the following format => DD/MM/YYYY HH:mm
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  return (
    <div className="border-white border-1 w-full bg-zinc-950 flex flex-col z-10 max-h-screen">
      <div className="h-16 px-4 py-5 flex gap-10 items-center bg-zinc-900 text-white ">
        <IoClose
          className="text-2xl cursor-pointer text-zinc-400"
          onClick={() => {
            dispatch({ type: reducerCases.SET_MESSAGE_SEARCH });
          }}
        />
        <span>Search Messages</span>
      </div>
      <div className="overflow-auto custom-scrollbar h-full">
        <div className="flex items-center flex-col w-full">
          <div className="flex px-5 items-center gap-3 h-14 w-full">
            <div className="bg-zinc-900 flex items-center gap-5 px-3  py-1 rounded-lg flex-grow ">
              <div>
                <BiSearchAlt2 className="text-white cursor-pointer text-lg" />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search messages"
                  className="bg-transparent text-sm focus:outline-none text-white w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <span className="mt-10 text-zinc-400">
            {!searchTerm.length &&
              `Search for messages with ${currentChatUser.name}`}
          </span>
        </div>
        <div className="flex justify-center h-full flex-col">
          {searchTerm.length > 0 && !searchedMessages.length && (
            <span className="text-zinc-400 w-full flex justify-center">
              No messages found
            </span>
          )}
          <div className="flex flex-col w-full h-full">
            {searchedMessages.map((message) => (
              <div className="flex cursor-pointer flex-col justify-center hover:bg-zinc-600 w-full px-5 border-b-[0.1px] border-secondary py-5">
                <div className="text-sm text-zinc-400">
                  {formatTime(message.createdAt)}
                </div>
                <div className="text-blue-500">{message.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMessages;
